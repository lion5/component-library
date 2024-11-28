<template>
  <button v-bind="$attrs" class="drop-down-item" :disabled="busy">
    <slot name="icon" v-if="!busy" />
    <slot name="busy-icon" v-if="busy">
      <ArrowRotateLoadingAnimation />
    </slot>
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'

withDefaults(
  defineProps<{
    /**
     * The dropdown item's label. Displayed beside the icon.
     */
    label: string
    /**
     * Indicates if the item is busy, affecting the displayed icon.
     */
    busy?: boolean
  }>(),
  {
    busy: false
  }
)
</script>

<style lang="scss" scoped>
.drop-down-item {
  width: 100%;
  display: flex;
  justify-content: space-between;
  gap: var(--space-sm);
  font-size: var(--font-size-1);
  color: inherit;
  background-color: transparent;
  border: none;
  padding: var(--space-xs) var(--space-sm);
  cursor: pointer;
  outline: none;
  align-items: center;

  &:hover,
  &:focus-within {
    background-color: var(--color-primary-300);
  }

  &:disabled {
    cursor: progress;
    color: var(--color-neutral-500);
  }
}
</style>
