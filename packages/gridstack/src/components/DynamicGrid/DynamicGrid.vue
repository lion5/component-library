<template>
  <div :class="[customGridStackClass || 'grid-stack']" @change="onChange">
    <BaseWidget
      v-for="widgetConfig in widgetConfigs"
      :key="widgetConfig.id"
      :widget-config="widgetConfig"
      :components="components"
      :editMode="editMode"
      @delete-widget="deleteWidget(widgetConfig.id)"
      @update-settings="
        (settings) => onUpdateWidgetSettings(widgetConfig.id, settings)
      "
    />
  </div>
</template>

<script lang="ts" setup>
import 'gridstack/dist/gridstack.min.css'
import { WidgetConfiguration } from '@gridstack/models/widgetConfiguration'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import { useGridStack } from '@gridstack/composables/useGridStack'
import BaseWidget from '@gridstack/components/BaseWidget/BaseWidget.vue'

/**
 * this component wraps the [gridstack.js]{@link https://gridstackjs.com/} lib functions and integrate its functionality into the vue framework.
 */

const props = defineProps<{
  /**
   * Is used to enable and disable gridStacks edit functions see {@link useGridStack}
   */
  editMode: boolean
  /**
   * The configuration of the widgets that shall be rendered on the grid
   */
  widgetConfigs: WidgetConfiguration[]
  /**
   * the components that are available for componentId resolution.
   */
  components: Map<string, WidgetComponentWrapper>
  /**
   * changes the custom gridStack class
   */
  customGridStackClass?: string
}>()

const emit = defineEmits<{
  /**
   * emitted when gridStack detects a change (user dropped element or resized element).
   *
   * @param widgetConfigurations the new widget configurations after user made change
   */
  (e: 'update:widgetConfigs', widgetConfigurations: WidgetConfiguration[]): void
}>()

const { onChange, deleteWidget, onUpdateWidgetSettings } = useGridStack(
  props,
  emit
)
</script>
