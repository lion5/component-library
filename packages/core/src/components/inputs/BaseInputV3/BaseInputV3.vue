<template>
  <div
    :class="[
      'base-input-wrapper',
      { dirty, invalid, required, 'floating-label': labelType === 'floating' },
      $attrs.class
    ]"
  >
    <label
      v-if="labelType === 'static'"
      :for="name"
      >{{ label }}
    </label>
    <div class="input-container">
      <slot name="before-input" />
      <div class="input-group">
        <slot name="prefix" />
        <div class="input-label">
          <input
            :id="name"
            v-model.trim="value"
            :name="name"
            :type="type"
            placeholder="hidden"
            :required="required"
            v-bind="$attrs"
          />
          <label
            v-if="labelType === 'floating'"
            :for="name"
            >{{ label }}
          </label>
        </div>
        <div class="postfix">
          <BaseTooltip
            v-if="showErrorIcon && invalid && errors.length"
            :content="errors[0]"
          >
            <template #trigger>
              <IconError class="error-icon" />
            </template>
            <template #content>
              <ErrorBox
                :errors="errorObjects"
                class="error-box"
              />
            </template>
          </BaseTooltip>
          <IconError
            v-else-if="showErrorIcon && invalid"
            class="error-icon"
          />
          <slot
            v-else
            name="postfix"
          />
          <slot name="fixed-postfix" />
        </div>
      </div>
      <slot name="after-input" />
    </div>
    <ErrorBox
      :errors="errorObjects"
      class="error-box"
    />
  </div>
</template>
<script generic="T" lang="ts" setup>
import IconError from '@core/components/icons/IconError.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import BaseTooltip from '@core/components/utils/BaseTooltip/BaseTooltip.vue'
import { computed } from 'vue'
import { InputLabelType } from '@core/components/inputs/BaseInputV3/inputLabelType'

defineOptions({
  inheritAttrs: false
})

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
    required?: boolean

    /**
     * The errors of the field. This is provided by `useField` from `vee-validate`.
     */
    errors?: Error[] | string[]
    labelType?: InputLabelType
  }>(),
  {
    type: 'text',
    dirty: false,
    invalid: false,
    required: false,
    showErrorIcon: true,
    labelType: 'floating',
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
<style lang="scss" scoped>
.base-input-wrapper {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_input-error-color: var(--color-danger);
  --_input-error-color-hover: var(--color-danger-hover);
  --tooltip-right: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-300);
  width: 100%;
  font-size: var(--_input-size);

  .input-container,
  .input-group {
    display: flex;
    align-items: center;
    gap: var(--space-xs);
    width: 100%;
  }

  .input-group {
    border-radius: var(--_input-border-radius);
    background-color: var(--_input-surface-color);
    padding-inline: var(--space-sm);
    gap: var(--space-sm);

    &:has(*:focus) {
      outline: 2px solid var(--color-primary);
    }
  }

  &.required input ~ label:after {
    display: inline-block;
    content: '*';
    font-size: 1.2rem;
    padding-left: 0.3rem;
    color: var(--color-danger);
    line-height: 0.5;
    transform: translateY(0.25rem);
  }

  label {
    font-size: var(--_label-size);
    color: var(--color-neutral-700);
    cursor: text;
    user-select: none;
  }

  .input-label {
    flex-grow: 1;

    input,
    label {
      font-size: var(--_input-size);
      background-color: transparent;
    }

    input {
      border: none;
      width: 100%;
      padding-block: var(--space-sm);

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

    input::placeholder,
    input::-webkit-input-placeholder {
      color: transparent !important;
      opacity: 0;
    }
  }

  &.floating-label .input-label {
    display: grid;
    position: relative;
    gap: var(--space-sm);

    input,
    label {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }

    input {
      padding-block-end: var(--space-xs);
      padding-block-start: calc(var(--_label-size) + var(--space-sm));
    }

    label {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      transform-origin: left center;
      transition: 0.15s ease-out;
      transition-property: top, margin-top, transform, font-size;
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

  .postfix {
    display: flex;
    align-items: center;
  }

  .postfix-icon {
    font-size: var(--_error-icon-size);
    place-self: center end;
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
