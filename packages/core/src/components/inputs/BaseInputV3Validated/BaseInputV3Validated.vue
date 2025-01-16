<template>
  <BaseInputV3
    :name="name"
    :label="label"
    v-model="value"
    :dirty="meta.dirty"
    :type="type"
    :invalid="meta.touched && !meta.valid"
    :showErrorIcon="showErrorIcon"
    :errors="errors"
    @blur="handleBlur"
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
<script setup lang="ts" generic="T">
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { RuleExpression, useField } from 'vee-validate'

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
const { value, meta, handleBlur, errors } = useField<T>(() => props.name, props.validationRules, {
  syncVModel: true
})
</script>
<style scoped lang="scss"></style>
