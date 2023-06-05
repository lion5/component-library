<template>
  <BaseButton @click="onClick" data-test="edit-button">
    <span v-if="!localEditMode">
      <i class="bi-pencil" />
      Dashboard bearbeiten
    </span>
    <span v-else>
      <i class="bi-save" />
      Dashboard speichern
    </span>
  </BaseButton>
  <BaseButton
    v-if="localEditMode"
    @click="$emit('cancelEdit')"
    data-test="cancel-button"
    variant="danger"
    >Abbrechen
  </BaseButton>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import BaseButton from '@/atoms/buttons/BaseButton/BaseButton.vue'

const props = defineProps<{
  /**
   * The current state of the editMode
   * If true an additional cancel button is shown.
   */
  editMode: boolean
}>()
const emit = defineEmits<{
  /**
   * emitted when edit button pressed and editMode was false before (User starts editing).
   */
  (e: 'startEdit'): void
  /**
   * emitted when edit button pressed and editMode was true before (User stops editing).
   */
  (e: 'stopEdit'): void
  /**
   * emitted when user presses cancel button.
   */
  (e: 'cancelEdit'): void
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

const onClick = () => {
  const newMode = !localEditMode.value
  localEditMode.value = newMode
  if (newMode) {
    emit('startEdit')
  } else {
    emit('stopEdit')
  }
}
</script>
