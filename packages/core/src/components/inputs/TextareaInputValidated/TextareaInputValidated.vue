<template>
  <TextareaInput
    :name="name"
    :label="label"
    v-model="value"
    :maxlength="maxlength"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
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
  </TextareaInput>
</template>
<script setup lang="ts">
import { RuleExpression, useField } from 'vee-validate'
import TextareaInput from '@core/components/inputs/TextareaInput/TextareaInput.vue'


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
     * The maximum length of the input field.
     */
    maxlength?: string,
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<string>
  }>(),
  {
    validationRules: undefined
  }
)
const { value, meta, handleBlur, errors } = useField<string>(() => props.name, props.validationRules, {
  syncVModel: true
})
</script>
<style scoped lang="scss">
.base-input-wrapper {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_input-error-color: var(--color-danger);
  --_input-error-color-hover: var(--color-danger-hover);
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  width: 100%;
  font-size: var(--_input-size);

  .input-group {
    display: flex;
    border-radius: var(--_input-border-radius);
    background-color: var(--_input-surface-color);
    align-items: center;
    gap: var(--space-sm);
    overflow: clip;

    &:has(*:focus) {
      outline: 2px solid var(--color-primary);
    }
  }

  .input-label {
    display: grid;
    position: relative;
    gap: var(--space-sm);
    flex-grow: 1;

    textarea,
    label {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      font-size: var(--_input-size);
      background-color: transparent;
      resize: vertical;
      padding-inline: var(--space-sm);
    }

    textarea {
      border: none;
      padding-block-end: var(--space-xs);
      padding-block-start: calc(var(--_label-size) + var(--space-sm));
      min-height: var(--_input-size);
      transition: border-color 0.15s ease-in-out,
      min-height 0.4s ease-in-out;

      &:focus {
        outline: none;
      }

      scrollbar-color: var(--color-font-2) var(--_input-surface-color);
      scrollbar-width: thin;
      scrollbar-gutter: stable;

      &::-webkit-scrollbar-thumb { /* Foreground */
        background: var(--scrollbar-foreground);
      }

      &::-webkit-scrollbar-track { /* Background */
        background: var(--scrollbar-background);
      }
    }

    label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      color: var(--color-neutral-600);
      transform-origin: left center;
      transition: 0.15s ease-out;
      transition-property: top, margin-top, transform, font-size;
      cursor: text;
      user-select: none;
      line-height: 1;
    }

    textarea:not(:placeholder-shown) ~ label,
    textarea:focus ~ label {
      top: 0;
      transform: translateY(0%);
      margin-top: var(--space-xs);
      font-size: var(--_label-size);
    }
  }

  textarea::placeholder,
  textarea::-webkit-input-placeholder {
    color: transparent !important;
    opacity: 0;
  }

  &.invalid textarea ~ label {
    color: var(--_input-error-color);
  }

  &.invalid textarea:hover ~ label {
    color: var(--_input-error-color-hover);
  }

  &.invalid .input-group:has(input:not(:focus)) {
    outline: 2px solid var(--_input-error-color);

    &:hover {
      outline: 2px solid var(--_input-error-color-hover);
    }
  }

  .error {
    color: var(--_input-error-color);
    font-size: var(--font-size-0);
  }

  .max-length-indicator {
    width: max-content;
    position: relative;
    float: right;
    display: block;
    color: var(--color-neutral-500);
    margin-block-start: var(--space-xs);
  }
}
</style>
