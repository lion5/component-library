<template>
  <div class="configurable-dashboard">
    <DashboardBar
      v-model:edit-mode="editMode"
      v-model:selected-dashboard-configuration="selectedDashboardId"
      :available-widgets="availableWidgets"
      :dashboard-configuration-options="dashboardConfigurationOptions"
      @start-save="prepareSave"
      @cancel-edit="onCancelEdit"
      @add-widget="onAddWidget"
      class="dashboard-bar"
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
import { nextTick, ref, watch } from 'vue'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { WidgetConfiguration } from '@/models/widgetConfiguration'
import { GridWidget } from '@/models/gridWidget'
import DashboardBar from '@/components/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@/components/DynamicGrid/DynamicGrid.vue'
import { DismissibleModal } from '@lion5/component-library'
import SaveDashboardModal from '@/components/SaveDashboardModal/SaveDashboardModal.vue'

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
  dashboardConfigurationOptions: Array<{ id: string; name: string }>
  /**
   * Selected dashboard configuration
   */
  selectedDashboardConfiguration: string | undefined
}>()
const emit = defineEmits<{
  (e: 'save', dashboardConfig: WidgetConfiguration[], name: string): void
  (e: 'update:dashboardConfig', dashboardConfig: WidgetConfiguration[]): void
  (e: 'update:selectedDashboardConfiguration', id: string): void
}>()

const currentConfig = ref<WidgetConfiguration[]>(props.dashboardConfig)
const editMode = ref<boolean>(false)
const showModal = ref(false)

const selectedDashboardId = ref<string | undefined>(
  props.selectedDashboardConfiguration
)

watch(selectedDashboardId, (id) => {
  if (id !== undefined) {
    emit('update:selectedDashboardConfiguration', id)
  }
})

watch(props.dashboardConfig, (newDashboardConfigFromProps) => {
  currentConfig.value = newDashboardConfigFromProps
})

watch(props.selectedDashboardConfiguration, (newSelectedDashboardId) => {
  if (typeof newSelectedDashboardId === 'string') {
    selectedDashboardId.value = newSelectedDashboardId
  }
})

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
.dashboard-bar {
  position: relative;
  z-index: 10000;
}
</style>
