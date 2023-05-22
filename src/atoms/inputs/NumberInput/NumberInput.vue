<template>
  <BaseInputWrapper>
    <input
      :id="name"
      :name="name"
      type="number"
      :value="value"
      placeholder="hidden"
      v-bind="$attrs"
      @input="handleInput"
      @blur="handleBlur"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
  </BaseInputWrapper>
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { ErrorMessage, useField } from 'vee-validate'
import BaseInputWrapper from '@/components/input/BaseInputWrapper.vue'

type InputValue = string | number | null

const props = withDefaults(
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
  }>(),
  {
    validationRules: '',
  }
)

const handleInput = (event: Event) => {
  setValue(Number((event.target as HTMLInputElement).value))
}
const { value, setValue, handleBlur } = useField<number>(props.name)
</script>
<style scoped lang="scss">
.error {
  color: var(--color-danger);
  font-size: var(--font-size-0);
}
</style>
