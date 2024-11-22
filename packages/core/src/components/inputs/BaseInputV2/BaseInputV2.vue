<template>
  <BaseInputWrapper>
    <input
      :id="name"
      :name="name"
      v-model="value"
      :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: (meta.touched && !meta.valid) || errors.length > 0
      }"
      :type="type"
      v-bind="$attrs"
      placeholder="hidden"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
    <template #postfix-icon>
      <slot name="postfix-icon" />
    </template>
  </BaseInputWrapper>
</template>
<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import { ErrorMessage } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

type InputValue = string | number | null

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    modelValue?: InputValue
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<InputValue>
    /**
     * The type of the HTML `input` element, e.g. "text", "password", or "number".
     */
    type?: string
  }>(),
  {
    type: 'text',
    validationRules: ''
  }
)
const { value, meta, errors } = useField<InputValue>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true
  }
)
</script>
<style scoped lang="scss"></style>
