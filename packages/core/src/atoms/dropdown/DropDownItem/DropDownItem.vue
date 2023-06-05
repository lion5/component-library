<template>
  <button v-bind="$attrs" class="drop-down-item">
    <slot name="icon" />
    {{ label }}
  </button>
</template>

<script lang="ts" setup>
defineProps<{
  /**
   * the dropdown items label. Displayed beside the icon
   */
  label: string
}>()
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

  &:hover,
  &:focus-within {
    background-color: var(--color-primary-300);
  }
}
</style>
