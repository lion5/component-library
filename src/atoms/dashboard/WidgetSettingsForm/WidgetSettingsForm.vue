<template>
  <Form
    class="dynamic-form"
    :initial-values="settingsObject"
    @submit="onSubmit"
  >
    <component
      v-for="{ is, additionalProps, ...attrs } in schema.fields"
      :key="attrs.name"
      :is="is"
      v-bind="{ ...additionalProps, ...attrs }"
    ></component>
    <BaseButton type="submit">Einstellungen vormerken</BaseButton>
  </Form>
</template>
<script lang="ts" setup>
import { Form } from 'vee-validate'
import { computed } from 'vue'
import { WidgetSettings } from '@/atoms/dashboard/models/widgetConfiguration'
import { FormSchema } from '@/atoms/dashboard/models/formSchema'
import { useWidget } from '@/atoms/dashboard/composables/useWidget'
import BaseButton from '@/atoms/buttons/BaseButton/BaseButton.vue'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
  schema: FormSchema
}>()

const { getSettings } = useWidget(props)
const settingsObject = computed(() => Object.fromEntries(getSettings()))
const emit = defineEmits<{
  (e: 'update:settings', widgetSettings: WidgetSettings): void
}>()

const onSubmit = (values: any) => {
  const settings = new Map(Object.entries(values)) as WidgetSettings
  emit('update:settings', settings)
}
</script>
<style lang="scss" scoped>
.dynamic-form {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-xs);

    [role='alert'] {
      color: var(--color-danger);
    }
  }
}
</style>
