<template>
  <div class="configurable-dashboard">
    <DashboardBar
      v-model:edit-mode="editMode"
      v-model:selected-dashboard-configuration="selectedDashboardConfiguration"
      :available-widgets="availableWidgets"
      :dashboard-configuration-options="dashboardConfigurationOptions"
      @start-save="prepareSave"
      @cancel-edit="onCancelEdit"
      @add-widget="onAddWidget"
      @delete-dashboard-configuration="onPrepareDelete"
      class="dashboard-bar"
    />
    <DynamicGrid
      :components="availableWidgets"
      v-model:widget-configs="dashboardConfig"
      :edit-mode="editMode"
    />
    <DismissibleModal
      v-model:modalDisplayed="showSaveModal"
      class="basic-modal"
    >
      <SaveDashboardModal
        v-if="showSaveModal"
        :show-error="showSaveModalError"
        @confirm-save="onConfirmSave"
      />
    </DismissibleModal>
    <DismissibleModal
      v-model:modal-displayed="showDeleteModal"
      class="basic-modal"
    >
      <DeleteDashboardModal
        v-if="showDeleteModal"
        :dashboard-name="selectedDashboardConfigurationName"
        @confirm-delete="onDeleteDashboardConfiguration"
      />
    </DismissibleModal>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { WidgetConfiguration } from '@/models/widgetConfiguration'
import { GridWidget } from '@/models/gridWidget'
import DashboardBar from '@/components/DashboardBar/DashboardBar.vue'
import DynamicGrid from '@/components/DynamicGrid/DynamicGrid.vue'
import { DismissibleModal } from '@lion5/component-library'
import SaveDashboardModal from '@/components/SaveDashboardModal/SaveDashboardModal.vue'
import DeleteDashboardModal from '@/components/DeleteDashboardModal/DeleteDashboardModal.vue'

const props = defineProps<{
  /**
   * A map of widgets that can be added to the dashboard
   */
  availableWidgets: Map<string, WidgetComponentWrapper>
  /**
   * An array of available saved dashboard configurations
   */
  dashboardConfigurationOptions: Array<{ id: string; name: string }>
}>()
const emit = defineEmits<{
  (e: 'deleteDashboardConfiguration', id: string): void
  (e: 'save', dashboardConfig: WidgetConfiguration[], name: string): void
}>()

/**
 * A flag that indicates if save modal should be displayed
 */
const showSaveModal = defineModel<boolean>('showSaveModal')
/**
 * A flag that indicates if an error should be displayed in the save modal
 */
const showSaveModalError = defineModel<boolean>('showSaveModalError')
/**
 * Selected dashboard configuration
 */
const selectedDashboardConfiguration = defineModel<string | undefined>(
  'selectedDashboardConfiguration'
)
/**
 * Configurations of the dashboardConfig that are displayed in the dashboard.
 * The {@link components} map need to include all component ids that are used in the dashboardConfig array
 */
const dashboardConfig = defineModel<WidgetConfiguration[]>('dashboardConfig', {
  required: true
})

/**
 * Currently set dashboardConfig
 */
const currentConfig = ref(dashboardConfig.value)
const editMode = ref<boolean>(false)
const showDeleteModal = ref<boolean>(false)
const selectedDashboardConfigurationName = computed(() => {
  const config = props.dashboardConfigurationOptions.find(
    (option) => option.id === selectedDashboardConfiguration.value
  )
  return config ? config.name : undefined
})

const prepareSave = () => {
  showSaveModal.value = true
}

const onConfirmSave = (name: string) => {
  editMode.value = false
  currentConfig.value = dashboardConfig.value
  emit('save', dashboardConfig.value, name)
  showSaveModal.value = false
}

const onCancelEdit = () => {
  editMode.value = false
  dashboardConfig.value = currentConfig.value
  showSaveModal.value = false
  showSaveModalError.value = false
}

const onDeleteDashboardConfiguration = () => {
  if (!selectedDashboardConfiguration.value) {
    return
  }
  emit('deleteDashboardConfiguration', selectedDashboardConfiguration.value)
  selectedDashboardConfiguration.value = undefined
  editMode.value = false
  showDeleteModal.value = false
}

const onPrepareDelete = () => {
  showDeleteModal.value = true
}

const onAddWidget = async (widgetKey: string) => {
  editMode.value = true
  const newWidget = new WidgetConfiguration(
    `widget-${Date.now()}`,
    new GridWidget(-1, -1, 2, 2),
    widgetKey
  )

  dashboardConfig.value = [newWidget, ...currentConfig.value]
  await nextTick()
  setTimeout(() => {
    document
      .querySelector(`#${newWidget.id}`)
      ?.scrollIntoView({ behavior: 'smooth' })
  }, 250)
}

watch(editMode, (isEditMode) => {
  if (isEditMode) {
    currentConfig.value = dashboardConfig.value
  }
})
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
