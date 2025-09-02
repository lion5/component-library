<template>
  <BaseInputWrapper>
    <input
      :id="name"
      :name="name"
      v-model="value"
      :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: meta.touched && !meta.valid
      }"
      :type="type"
      v-bind="$attrs"
      placeholder="hidden"
      @blur="handleBlur"
    />
    <label :for="name">{{ label }}</label>
    <span
      v-if="errorMessage && meta.touched"
      class="error"
      >{{ errorMessage }}</span
    >
    <template #postfix-icon>
      <slot name="postfix-icon" />
    </template>
  </BaseInputWrapper>
</template>
<script setup lang="ts" generic="T">
import { RuleExpression, useField } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

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
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<T>
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
const { value, meta, handleBlur, errorMessage } = useField<T>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true
  }
)
</script>
<style scoped lang="scss"></style>
