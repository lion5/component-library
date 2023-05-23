<template>
  <div class="checkbox-wrapper">
    <Field
      as="input"
      :id="name"
      :name="name"
      type="checkbox"
      :value="true"
      v-bind="$attrs"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
  </div>
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { ErrorMessage, Field } from 'vee-validate'

type InputValue = string | number | null

withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within the input as a placeholder, and as a non-visible label (for screen readers / SEO).
     */
    label: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<InputValue>
  }>(),
  {
    validationRules: ''
  }
)
</script>
<style scoped lang="scss">
.base-input-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-0);
  }
}
</style>
