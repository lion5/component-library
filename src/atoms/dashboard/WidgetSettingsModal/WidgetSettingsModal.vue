<template>
  <DismissibleModal
    class="settings-modal"
    v-model:modal-displayed="localModalDisplayed"
  >
    <h1 class="headline">{{ widgetName }} Einstellungen</h1>
    <WidgetSettingsForm
      :schema="formSchema"
      :settings="settings"
      :defaultSettings="defaultSettings"
      @update:settings="onSettingsUpdate"
    />
  </DismissibleModal>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import { WidgetSettings } from '@/atoms/dashboard/models/widgetConfiguration'
import { FormSchema } from '@/atoms/dashboard/models/formSchema'
import DismissibleModal from '@/atoms/modals/DismissibleModal/DismissibleModal.vue'
import WidgetSettingsForm from '@/atoms/dashboard/WidgetSettingsForm/WidgetSettingsForm.vue'

const props = defineProps<{
  modalDisplayed: boolean
  widgetName: string
  settings: WidgetSettings
  defaultSettings: WidgetSettings
  formSchema: FormSchema
}>()

const emit = defineEmits<{
  (e: 'update:settings', settings: WidgetSettings): void
  (e: 'update:modalDisplayed', settings: boolean): void
}>()

const localModalDisplayed = computed({
  get() {
    return props.modalDisplayed
  },
  set(modalDisplayed: boolean) {
    emit('update:modalDisplayed', modalDisplayed)
  }
})

const onSettingsUpdate = (newSettings: WidgetSettings) => {
  emit('update:settings', newSettings)
  emit('update:modalDisplayed', false)
}
</script>
<style lang="scss" scoped>
.settings-modal :deep(.content) {
  padding: var(--space-md);

  .headline {
    padding-inline-end: var(--space-xl);
  }
}
</style>
