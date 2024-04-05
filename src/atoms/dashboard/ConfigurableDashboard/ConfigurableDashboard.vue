<template>
  <div class="configurable-dashboard">
    <DashboardBar
      v-model:edit-mode="editMode"
      :available-widgets="availableWidgets"
      :dashboard-configurations="dashboardConfigurations"
      @start-save="prepareSave"
      @cancel-edit="onCancelEdit"
      @add-widget="onAddWidget"
      @dashboardSelected="onDashboardSelected"
    />
    <DynamicGrid
      :components="availableWidgets"
      v-model:widget-configs="currentConfig"
      :edit-mode="editMode"
    />
    <DismissibleModal v-model:modalDisplayed="showModal" class="basic-modal">
      <SaveDashboardModal v-if="showModal" @confirm-save="onConfirmSave" />
    </DismissibleModal>
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref } from 'vue'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import { WidgetConfiguration } from '@/atoms/dashboard/models/widgetConfiguration'
import { GridWidget } from '@/atoms/dashboard/models/gridWidget'
import DashboardBar from '@/atoms/dashboard/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@/atoms/dashboard/DynamicGrid/DynamicGrid.vue'
import DismissibleModal from '@/atoms/modals/DismissibleModal/DismissibleModal.vue'
import SaveDashboardModal from '@/atoms/dashboard/SaveDashboardModal/SaveDashboardModal.vue'

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
  /**
   * An array of available saved dashboard configurations
   */
  dashboardConfigurations: Array<{ id: string; name: string }>
}>()
const emit = defineEmits<{
  (e: 'save', dashboardConfig: WidgetConfiguration[], name: string): void
  (e: 'update:dashboardConfig', dashboardConfig: WidgetConfiguration[]): void
  (e: 'dashboardConfigurationSelected', id: string): void
}>()

const currentConfig = ref<WidgetConfiguration[]>(props.dashboardConfig)
const editMode = ref<boolean>(false)
const showModal = ref(false)

const onDashboardSelected = (id: string) => {
  emit('dashboardConfigurationSelected', id)
}

const prepareSave = () => {
  showModal.value = true
}

const onConfirmSave = (name: string) => {
  editMode.value = false
  emit('update:dashboardConfig', currentConfig.value)
  emit('save', currentConfig.value, name)
  showModal.value = false
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
