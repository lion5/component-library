<template>
  <div class="save-dashboard-modal">
    <h3 class="header1">Konfigurationsname eingeben</h3>
    <div class="header2">
      Bitte wählen Sie den Dashboard-Konfigurationsnamen
    </div>
    <BaseInputV2
      v-model="name"
      label="Name"
      :validation-rules="required"
      name="name"
      class="base-input"
    />
    <ErrorBox class="error-message" :error="nameError" />

    <BaseButton :disabled="!name" @click="submit" class="save-button">
      Speichern
    </BaseButton>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, toRef } from 'vue'
import { BaseInputV2, BaseButton, ErrorBox } from '@lion5/component-library'

const name = ref('')
const required = computed(() => ({
  required: (value: unknown) => !!value
}))
const props = defineProps({
  showError: Boolean,
  error: Error
})

const nameError = toRef(props.error)

const emit = defineEmits(['confirmSave'])

const submit = () => {
  emit('confirmSave', name.value)
}
</script>

<style lang="scss" scoped>
.base-input {
  max-width: unset;
  width: 100%;
}
.save-dashboard-modal {
  padding: 0 1rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: flex-start;
}
.save-button {
  max-width: unset;
  width: 100%;
}
.header1,
.header2 {
  min-width: 300px;
}
</style>
