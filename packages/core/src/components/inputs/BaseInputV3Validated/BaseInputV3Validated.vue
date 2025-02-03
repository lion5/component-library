<template>
  <BaseInputV3
    v-model="value"
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :name="name"
    :required="required"
    :showErrorIcon="showErrorIcon"
    :type="type"
    @blur="syncBlur"
  >
    <template
      v-for="(_, slotName) in $slots"
      v-slot:[slotName]="slotProps"
    >
      <slot
        :name="slotName"
        v-bind="slotProps ?? {}"
      />
    </template>
  </BaseInputV3>
</template>
<script generic="T" lang="ts" setup>
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { RuleExpression, useField } from 'vee-validate'
import { computed } from 'vue'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    modelValue?: T
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * The type of the HTML `input` element, e.g. "text", "password", or "number".
     */
    type?: string
    /**
     * Whether to show the error icon or not. Defaults to `true`.
     */
    showErrorIcon?: boolean
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<T>
  }>(),
  {
    validationRules: undefined
  }
)

const emit = defineEmits<{
  (e: 'blur', event: FocusEvent): void
  (e: 'update:modelValue', value: T): void
}>()

const required = computed(() => (props.validationRules as Schema)?.spec?.optional === false)

const { value, meta, handleBlur, errors } = useField<T>(() => props.name, props.validationRules, {
  syncVModel: true
})

const syncBlur = (event: FocusEvent) => {
  handleBlur(event)
  emit('blur', event)
}
</script>
<style lang="scss" scoped></style>
