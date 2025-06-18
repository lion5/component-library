<template>
  <button
    class="icon-button"
    :class="{ busy, filled }"
    type="button"
    v-bind="$attrs"
    :disabled="disabled"
  >
    <ArrowRotateLoadingAnimation v-if="busy" />
    <!-- @slot the icon that shall be displayed -->
    <slot v-else />
  </button>
</template>
<script setup lang="ts">
import { computed } from 'vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'

const props = defineProps<{
  /**
   * Whether the button is disabled.
   */
  disabled?: boolean,
  /**
   * Whether the button is busy.
   */
  busy?: boolean
  /**
   * Whether the button is filled.
   */
  filled?: boolean
}>()

const disabled = computed(() => props.disabled || props.busy)
</script>
<style lang="scss" scoped>
.icon-button {
  display: grid;
  place-content: center;
  border: none;
  border-radius: var(--icon-button-radius, var(--border-radius-300));
  font-size: var(--icon-button-font-size, unset);
  background: transparent;
  line-height: 0.5;
  transition: transform 0.04s ease-in-out;
  padding: var(--space-sm);
  cursor: pointer;

  &.filled {
    color: var(--icon-button-color, var(--color-primary-100));
    background-color: var(--icon-button-bg-color, var(--color-primary));
  }

  &:focus-visible {
    border-radius: var(--border-radius-round);
    outline-color: var(--color-primary);
    outline-offset: 2px;
  }

  &:not([disabled]):hover {
    background-color: var(--icon-button-bg-hover-color, var(--color-neutral-300));
  }

  &.filled:not([disabled]):hover {
    background-color: var(--icon-button-bg-hover-color, var(--color-primary-hover));
  }

  &:disabled {
    cursor: unset;

    &:not(.busy) {
      opacity: 0.5;
    }
  }
}

</style>
