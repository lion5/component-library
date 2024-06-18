<template>
  <BaseButton
    v-if="showDeleteButton"
    @click="$emit('deleteDashboardConfiguration')"
    data-test="delete-button"
    variant="danger"
  >
    <i class="bi-trash" />
    Dashboard löschen
  </BaseButton>
  <BaseButton @click="onClick" data-test="edit-button">
    <span v-if="!editMode">
      <i class="bi-pencil" />
      Dashboard bearbeiten
    </span>
    <span v-else>
      <i class="bi-save" />
      Dashboard speichern
    </span>
  </BaseButton>
  <BaseButton
    v-if="editMode"
    @click="$emit('cancelEdit')"
    data-test="cancel-button"
    variant="danger"
    >Abbrechen
  </BaseButton>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { BaseButton } from '@lion5/component-library'

const props = defineProps<{
  /**
   * The current state of the editMode
   * If true an additional cancel button is shown.
   */
  editMode: boolean
  /**
   * If true a dashboard option is selected. thus, delete button is shown.
   */
  dashboardOptionSelected: boolean
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
   * emitted when user presses delete button.
   */
  (e: 'deleteDashboardConfiguration'): void
  /**
   * emitted when user presses cancel or edit button.
   */
  (e: 'update:editMode', value: boolean): void
}>()

const localEditMode = computed({
  get() {
    return props.editMode
  },
  set(newEditMode: boolean) {
    emit('update:editMode', newEditMode)
  }
})

const showDeleteButton = computed(
  () => props.dashboardOptionSelected && localEditMode.value
)

const onClick = () => {
  const newMode = !localEditMode.value
  if (newMode) {
    localEditMode.value = newMode
  }
  if (newMode) {
    emit('startEdit')
  } else {
    emit('startSave')
  }
}
</script>
