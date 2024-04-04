import type { GridStackWidget } from 'gridstack'
import { GridStack } from 'gridstack'
import { computed, nextTick, onMounted, watch } from 'vue'
import {
  WidgetConfiguration,
  WidgetSettings
} from '@/models/widgetConfiguration'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'

/**
 * this composable integrates the [gridstack.js]{@link https://gridstackjs.com/} lib functions into the vue ecosystem.
 *
 * It registers the following hooks:
 * - a <code>onMounted</code> hook that initializes the Grid with the predefined settings.
 * - a <code>watch</code>er to listen on the editMode prop and enable or disable the edit functionality of gridStack.
 * - a <code>watch</code>er to listen on widgetConfigs changes and update gridStacks representation of the widgetConfigs.
 */
export function useGridStack(
  props: {
    editMode: boolean
    widgetConfigs: WidgetConfiguration[]
    components: Map<string, WidgetComponentWrapper>
    customGridStackClass?: string
  },
  emit: { (e: 'update:widgetConfigs', widgets: WidgetConfiguration[]): void }
) {
  let grid: GridStack | undefined = undefined
  const widgetsMap = computed((): Map<string, WidgetConfiguration> => {
    const map = new Map<string, WidgetConfiguration>()
    for (const widget of props.widgetConfigs) {
      map.set(widget.id, widget)
    }
    return map
  })

  onMounted(() => {
    initializeGrid()
  })

  watch(
    () => props.editMode,
    (editMode: boolean) => {
      if (editMode) {
        enable()
      } else {
        disable()
      }
    }
  )

  watch(
    () => props.widgetConfigs,
    async (widgets: WidgetConfiguration[]) => {
      await load(widgets)
    }
  )

  const initializeGrid = () => {
    grid = GridStack.init(
      {
        id: '',
        class: '',
        cellHeight: '5vh',
        column: 12,
        minRow: 1,
        margin: '.25rem',
        alwaysShowResizeHandle: true,
        disableResize: true,
        disableDrag: true
      },
      props.customGridStackClass
    )
  }

  const load = async (widgets: WidgetConfiguration[]) => {
    grid?.removeAll(false)
    await nextTick()
    grid?.batchUpdate(true)
    for (const widget of widgets) {
      makeWidget(widget)
    }
    grid?.batchUpdate(false)
  }

  const getCurrentConfig = (): WidgetConfiguration[] => {
    const gridContent = grid?.save(true, false) as GridStackWidget[]
    return gridContent.map((gridWidget) =>
      _mergeWidgetWithGridStackWidget(gridWidget)
    )
  }

  const _mergeWidgetWithGridStackWidget = (
    gridStackWidget: GridStackWidget
  ): WidgetConfiguration => {
    const originalWidget = widgetsMap.value.get(gridStackWidget.id as string)
    return WidgetConfiguration.fromGridStackWidget(
      gridStackWidget,
      originalWidget?.componentId || '',
      originalWidget?.settings || new Map()
    )
  }

  const makeWidget = (widget: WidgetConfiguration) => {
    grid?.makeWidget(`#${widget.id}`)
  }

  const enable = () => {
    grid?.enable()
  }

  const disable = () => {
    grid?.disable()
  }

  const deleteWidget = (widgetId: string) => {
    grid?.removeWidget(widgetId, false, false)
    onChange()
  }

  const onUpdateWidgetSettings = (
    widgetConfigId: string,
    settings: WidgetSettings
  ) => {
    const updatedWidgetConfigs = [...props.widgetConfigs]
    const widgetConfigIndex = updatedWidgetConfigs.findIndex(
      (widgetConfig) => widgetConfig.id === widgetConfigId
    )
    const widgetConfig = updatedWidgetConfigs[widgetConfigIndex]
    updatedWidgetConfigs[widgetConfigIndex] = new WidgetConfiguration(
      widgetConfig.id,
      widgetConfig.position,
      widgetConfig.componentId,
      settings
    )
    emit('update:widgetConfigs', updatedWidgetConfigs)
  }

  /**
   * emits the current widgets configuration if grid is initialized.
   */
  const onChange = () => {
    if (!grid) return
    const config = getCurrentConfig()
    emit('update:widgetConfigs', config)
  }

  return {
    grid,
    onChange,
    deleteWidget,
    onUpdateWidgetSettings
  }
}
