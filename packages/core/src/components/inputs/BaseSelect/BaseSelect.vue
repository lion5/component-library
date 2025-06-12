<template>
  <BaseInputWrapper>
    <select
      :name="name"
      :id="name"
      @change="handleChange"
      v-model="value"
    >
      <option
        v-if="optionsLabel"
        value=""
        disabled
        selected
      >
        {{ optionsLabel }}
      </option>
      <option
        v-for="option in options"
        :key="getValue(option) || undefined"
        :value="getValue(option)"
      >
        {{ getLabel(option) }}
      </option>
    </select>
    <label :for="name">{{ label }}</label>
    <span
      class="error"
      v-if="errorMessage && meta.touched"
    >
      {{ errorMessage }}
    </span>
  </BaseInputWrapper>
</template>
<script setup lang="ts" generic="LabelType">
import type { RuleExpression } from 'vee-validate'
import { useField } from 'vee-validate'
import { toRef } from 'vue'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

type InputValue = string | number | boolean | null

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
    /**
     * Options that shall be shown in the select dropdown
     */
    options: string[] | SelectOption<LabelType>[]
    /**
     * the label that shall be shown as default if nothing is selected.
     * An empty select box is displayed if it is not set.
     */
    optionsLabel?: string
  }>(),
  {
    validationRules: ''
  }
)

const localName = toRef(props, 'name')
const { value, errorMessage, meta, handleChange } = useField<string>(localName)

const getLabel = (option: string | SelectOption<LabelType>) => {
  if (option instanceof SelectOption) {
    return option.label
  }
  return option
}

const getValue = (option: string | SelectOption<LabelType>): string | number | undefined => {
  if (option instanceof SelectOption) {
    return option.key as string | number | undefined
  }
  return option
}
</script>
<style scoped lang="scss">
.base-input-wrapper {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-100));

  display: grid;
  position: relative;
  gap: var(--space-sm);

  & > select,
  & > label {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-size: var(--_input-size);
    padding-inline: var(--space-sm);
  }

  & > select {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    border: none;
    padding-block-end: var(--space-xs);
    padding-block-start: calc(var(--_label-size) + var(--space-sm));
    border-radius: var(--border-radius-300);
    background-color: var(--_input-surface-color);
  }

  & > label {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-700);
    transform-origin: left center;
    transition: 0.15s ease-out;
    transition-property: all;
    cursor: text;
    user-select: none;
    line-height: 1;
  }

  select::placeholder,
  select::-webkit-input-placeholder {
    /* Chrome/Opera/Safari */
    color: transparent !important;
    opacity: 0;
  }

  select:not(:placeholder-shown) ~ label,
  select:focus ~ label {
    top: 0;
    transform: translateY(0%);
    margin-top: var(--space-xs);
    font-size: var(--_label-size);
  }

  select.failed:not(:focus) {
    outline: 2px solid var(--color-danger);
  }

  select:focus {
    outline: 2px solid var(--color-primary);
  }

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-0);
  }
}
</style>
