<template>
  <div
    :class="{
      'base-input-wrapper': true,
      dirty,
      invalid
    }"
  >
    <div class="input-group">
      <slot name="prefix" />
      <div class="input-label">
        <input
          :id="name"
          :name="name"
          v-model.trim="value"
          :type="type"
          placeholder="hidden"
          v-bind="$attrs"
        />
        <label :for="name">{{ label }}</label>
      </div>
      <div class="postfix">
        <IconError v-if="invalid" class="error-icon" />
        <slot v-else name="postfix" />
      </div>
    </div>
    <ErrorBox class="error-box" :errors="errorObjects" />
  </div>
</template>
<script setup lang="ts" generic="T">
import IconError from '@core/components/icons/IconError.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import { computed } from 'vue'


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
     * The type of the HTML `input` element, e.g. "text", "password", or "number".
     */
    type?: string
    /**
     * Whether to show the error icon or not. Defaults to `true`.
     */
    showErrorIcon?: boolean
    /**
     * The meta information of the field. This is provided by `useField` from `vee-validate`.
     */
    dirty?: boolean
    invalid?: boolean
    /**
     * The errors of the field. This is provided by `useField` from `vee-validate`.
     */
    errors?: Error[] | string[]
  }>(),
  {
    type: 'text',
    dirty: false,
    invalid: false,
    showErrorIcon: true,
    errors: () => []
  }
)
/**
 * The value to display
 */
const value = defineModel<T>()

const errorObjects = computed(() => {
  if (!props.invalid) {
    return []
  }
  return props.errors.map((error) => {
    if (typeof error === 'string') {
      return new Error(error)
    }
    return error
  })
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
    padding-inline: var(--space-sm);
    gap: var(--space-sm);

    &:has(*:focus) {
      outline: 2px solid var(--color-primary);
    }
  }

  .input-label {
    display: grid;
    position: relative;
    gap: var(--space-sm);
    flex-grow: 1;

    input,
    label {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
      font-size: var(--_input-size);
      background-color: transparent;
    }

    input {
      border: none;
      padding-block-end: var(--space-xs);
      padding-block-start: calc(var(--_label-size) + var(--space-sm));

      &:focus {
        outline: none;
      }

      &[type='color'] {
        -webkit-appearance: none;
        border: none;
        width: 100%;
        height: 2.5rem;

        &::-webkit-color-swatch-wrapper {
          padding: 0;
        }

        &::-webkit-color-swatch {
          border: none;
          border-radius: var(--_input-border-radius);
        }
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

    input:not(:placeholder-shown) ~ label,
    input:focus ~ label {
      top: 0;
      transform: translateY(0%);
      margin-top: var(--space-xs);
      font-size: var(--_label-size);
    }
  }

  input::placeholder,
  input::-webkit-input-placeholder {
    color: transparent !important;
    opacity: 0;
  }

  .error-icon {
    color: var(--color-danger);
  }

  &.invalid input ~ label {
    color: var(--_input-error-color);
  }

  &.invalid input:hover ~ label {
    color: var(--_input-error-color-hover);
  }

  &.invalid .input-group:has(input:not(:focus)) {
    outline: 2px solid var(--_input-error-color);

    &:hover {
      outline: 2px solid var(--_input-error-color-hover);

      .error-icon {
        color: var(--_input-error-color-hover);
      }
    }
  }

  .error {
    color: var(--_input-error-color);
    font-size: var(--font-size-0);
  }
}
</style>
