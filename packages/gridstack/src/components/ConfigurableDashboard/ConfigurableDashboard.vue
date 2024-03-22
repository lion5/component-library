<template>
  <div class="configurable-dashboard">
    <DashboardBar
      v-model:edit-mode="editMode"
      :available-widgets="availableWidgets"
      @stop-edit="onStopEdit"
      @cancel-edit="onCancelEdit"
      @add-widget="onAddWidget"
    />
    <DynamicGrid
      :components="availableWidgets"
      v-model:widget-configs="currentConfig"
      :edit-mode="editMode"
    />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import { WidgetConfiguration } from '@gridstack/models/widgetConfiguration'
import { GridWidget } from '@gridstack/models/gridWidget'
import DashboardBar from '@gridstack/components/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@gridstack/components/DynamicGrid/DynamicGrid.vue'

const props = defineProps<{
  /**
   * Configurations of the dashboardConfig that are displayed in the dashboard.
   * The {@link components} map need to include all component ids that are used in the dashboardConfig array
   */
  dashboardConfig: WidgetConfiguration[]
  /**
   * A map of widgets that can be added to the dashboard
   */
  availableWidgets: Map<string, WidgetComponentWrapper>
}>()
const emit = defineEmits<{
  (e: 'save', dashboardConfig: WidgetConfiguration[]): void
  (e: 'update:dashboardConfig', dashboardConfig: WidgetConfiguration[]): void
}>()

const currentConfig = ref<WidgetConfiguration[]>(props.dashboardConfig)
const editMode = ref<boolean>(false)

const onStopEdit = () => {
  editMode.value = false
  emit('update:dashboardConfig', currentConfig.value)
  emit('save', currentConfig.value)
}
const onCancelEdit = () => {
  editMode.value = false
  currentConfig.value = props.dashboardConfig
}

const onAddWidget = async (widgetKey: string) => {
  editMode.value = true
  const newWidget = new WidgetConfiguration(
    `widget-${Date.now()}`,
    new GridWidget(-1, -1, 2, 2),
    widgetKey
  )

  currentConfig.value = [newWidget, ...currentConfig.value]
  await nextTick()
  setTimeout(() => {
    document
      .querySelector(`#${newWidget.id}`)
      ?.scrollIntoView({ behavior: 'smooth' })
  }, 250)
}
</script>

<style scoped>
.configurable-dashboard {
  display: grid;
  gap: var(--space-sm);
}
</style>
