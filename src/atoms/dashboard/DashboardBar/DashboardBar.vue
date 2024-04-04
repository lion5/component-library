<template>
  <div class="dashboard-bar">
    <h1>Dashboard</h1>
    <div class="right-aligned">
      <AddWidgetButton
        :available-widgets="availableWidgets"
        @add-widget="(widgetKey) => $emit('addWidget', widgetKey)"
      />
      <EditButton
        v-model:edit-mode="localEditMode"
        @start-edit="$emit('startEdit')"
        @start-save="$emit('startSave')"
        @cancel-edit="$emit('cancelEdit')"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import AddWidgetButton from '@/atoms/dashboard/AddWidgetButton/AddWidgetButton.vue'
import EditButton from '@/atoms/dashboard/EditButton/EditButton.vue'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'

const props = defineProps<{
  /**
   * The current state of the editMode. Used by the {@link EditButton}.
   */
  editMode: boolean
  /**
   * A map of widgets that can be added to the dashboard
   */
  availableWidgets: Map<string, WidgetComponentWrapper>
}>()
const emit = defineEmits<{
  /**
   * emitted when edit button pressed and editMode was false before (User starts editing).
   */
  (e: 'startEdit'): void
  /**
   * emitted when edit button pressed and editMode was true before (User starts saving).
   */
  (e: 'startSave'): void
  /**
   * emitted when user presses cancel button.
   */
  (e: 'cancelEdit'): void
  /**
   * add widget
   */
  (e: 'addWidget', widgetKey: string): void
  /**
   * emitted when user presses cancel or edit button.
   */
  (e: 'update:editMode', value: boolean): void
}>()
const localEditMode = computed({
  get() {
    return props.editMode
  },
  set(editMode: boolean) {
    emit('update:editMode', editMode)
  }
})
</script>

<style lang="scss" scoped>
.dashboard-bar {
  display: flex;
  justify-content: space-between;
  padding-inline: var(--space-xs);
  gap: var(--space-sm);
  padding: var(--space-sm);

  .right-aligned {
    display: flex;
    gap: var(--space-sm);
  }
}
</style>
