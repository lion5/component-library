<template>
  <div class="base-input-wrapper">
    <slot />
    <ErrorIcon class="error-icon" />
  </div>
</template>
<style scoped lang="scss">
.base-input-wrapper {
  --_input-size: var(--input-font-size, 1.2rem);
  --_label-size: var(--input-label-font-size, 0.75rem);
  --_input-surface-color: var(--input-surface-color, var(--color-neutral-200));
  --_error-icon-size: var(--_input-size);

  display: grid;
  position: relative;
  gap: var(--space-sm);

  & > :deep(input),
  & > :deep(label),
  & > .error-icon {
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

  .error-icon {
    display: none;
    font-size: var(--_error-icon-size);
    color: var(--color-danger);
    place-self: center end;
  }

  & > :deep(input) {
    border: none;
    padding-block-end: var(--space-xs);
    padding-block-start: calc(var(--_label-size) + var(--space-sm));
    border-radius: var(--input-border-radius);
    background-color: var(--_input-surface-color);

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
        border-radius: 0.3rem;
      }
    }
  }

  & > :deep(label) {
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

  :deep(input::placeholder),
  :deep(input::-webkit-input-placeholder) {
    /* Chrome/Opera/Safari */
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

  :deep(input.failed ~ label) {
    color: var(--color-danger);
  }

  :deep(input.failed ~ .error-icon) {
    display: inline-block;
  }

  :deep(input.failed:hover ~ label) {
    color: var(--color-danger-hover);
  }

  :deep(input.failed:not(:focus)) {
    outline: 2px solid var(--color-danger);
  }

  :deep(input.failed:not(:focus):hover) {
    outline: 2px solid var(--color-danger-hover);
  }

  :deep(input.failed:not(:focus):hover ~ .error-icon),
  :deep(.error-icon):hover {
    color: var(--color-danger-hover);
  }

  :deep(input:focus) {
    outline: 2px solid var(--color-primary);
  }

  :deep(.error) {
    color: var(--color-danger);
    font-size: var(--font-size-0);
  }
}
</style>
<script setup lang="ts">
import ErrorIcon from '@/components/icons/ErrorIcon.vue'
</script>
