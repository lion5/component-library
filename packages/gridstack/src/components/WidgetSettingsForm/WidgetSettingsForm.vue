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
import { WidgetSettings } from '@/models/widgetConfiguration'
import { FormSchema } from '@/models/formSchema'
import { useWidget } from '@/composables/useWidget'
import { BaseButton } from '@lion5/component-library'

const props = defineProps<{
  /**
   * the customer set widget settings. Overwrites the {@link defaultSettings} prop.
   */
  settings: WidgetSettings
  /**
   * the default settings of the widget
   */
  defaultSettings: WidgetSettings
  /**
   * the form schema that is used to render the form
   */
  schema: FormSchema
}>()

const emit = defineEmits<{
  /**
   * is emitted if the user click the submit button
   * @param e
   * @param widgetSettings the updated widgetSettings
   */
  (e: 'update:settings', widgetSettings: WidgetSettings): void
}>()

const { getSettings } = useWidget(props)
const settingsObject = computed(() => Object.fromEntries(getSettings()))

const onSubmit = (values: object) => {
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
