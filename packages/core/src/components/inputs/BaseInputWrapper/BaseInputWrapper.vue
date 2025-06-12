<script lang="ts" setup>
import IconError from '@core/components/icons/IconError.vue'

//props showPlaceholder: boolean
withDefaults(
  defineProps<{
    showPlaceholder?: boolean
    showErrorIcon?: boolean
  }>(),
  {
    showPlaceholder: false,
    showErrorIcon: true
  }
)
</script>
<template>
  <div
    class="base-input-wrapper"
    :class="{ 'hide-placeholder': !showPlaceholder }"
  >
    <slot />
    <div class="postfix-icon"><slot name="postfix-icon" /></div>
    <IconError v-if="showErrorIcon" class="error-icon" />
  </div>
</template>
<style scoped lang="scss">
.base-input-wrapper {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_input-border-radius: var(--input-border-radius, var(--border-radius-300));
  --_error-icon-size: var(--_input-size);
  --_input-error-color: var(--color-danger);
  --_input-error-color-hover: var(--color-danger-hover);

  display: grid;
  position: relative;
  gap: var(--space-sm);

  & > :deep(input),
  & > :deep(label),
  & > .error-icon,
  & > .postfix-icon {
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    font-size: var(--_input-size);
    padding-inline: var(--space-sm);
  }

  & > :deep(input),
  & > :deep(label) {
    padding-inline-end: calc(
      // Add spacing to prevent leakage into error icon
      var(--space-sm) + var(--_error-icon-size) + var(--space-xs)
    );
  }

  .error-icon,
  .postfix-icon {
    font-size: var(--_error-icon-size);
    place-self: center end;
  }

  .error-icon {
    color: var(--color-danger);
    display: none;
  }

  & > :deep(input) {
    border: none;
    padding-block-end: var(--space-xs);
    padding-block-start: calc(var(--_label-size) + var(--space-sm));
    border-radius: var(--_input-border-radius);
    background-color: var(--_input-surface-color);
    width: 100%;

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

  & > :deep(label) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: var(--color-neutral-700);
    transform-origin: left center;
    transition: 0.15s ease-out;
    transition-property: top, margin-top, transform, font-size;
    cursor: text;
    user-select: none;
    line-height: 1;
  }

  &.hide-placeholder :deep(input::placeholder),
  &.hide-placeholder :deep(input::-webkit-input-placeholder) {
    color: transparent !important;
    opacity: 0;
  }

  :deep(input:not(:placeholder-shown) ~ label),
  :deep(input:focus ~ label) {
    top: 0;
    transform: translateY(0%);
    margin-top: var(--space-xs);
    font-size: var(--_label-size);
  }

  :deep(input.invalid ~ label) {
    color: var(--_input-error-color);
  }

  :deep(input.invalid ~ .error-icon) {
    display: inline-block;
  }

  :deep(input.invalid ~ .postfix-icon) {
    display: none;
  }

  :deep(input.invalid:hover ~ label) {
    color: var(--_input-error-color-hover);
  }

  :deep(input.invalid:not(:focus)) {
    outline: 2px solid var(--_input-error-color);
  }

  :deep(input.invalid:not(:focus):hover) {
    outline: 2px solid var(--_input-error-color-hover);
  }

  :deep(input.invalid:not(:focus):hover ~ .error-icon),
  :deep(.error-icon):hover {
    color: var(--_input-error-color-hover);
  }

  :deep(input:focus) {
    outline: 2px solid var(--color-primary);
  }

  :deep(.error) {
    color: var(--_input-error-color);
    font-size: var(--font-size-0);
  }
}
</style>
