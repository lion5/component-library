<template>
  <BaseInputWrapper>
    <Field
      as="input"
      :id="name"
      :name="name"
      :type="type"
      v-bind="$attrs"
      placeholder="hidden"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
  </BaseInputWrapper>
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { ErrorMessage, Field } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

type InputValue = string | number | null

withDefaults(
  defineProps<{
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
</script>
<style scoped lang="scss"></style>
