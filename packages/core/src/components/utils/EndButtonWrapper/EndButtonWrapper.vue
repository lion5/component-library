<template>
  <div class="end-button-wrapper">
    <slot />
    <IconButton
      class="add-button"
      filled
      :label="label"
      :variant="btnVariant"
      @click="emit('btn-click')"
    >
      <i :class="iconClass" />
    </IconButton>
  </div>
</template>

<script setup lang="ts">

import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

withDefaults(
  defineProps<{
    /**
     * Sets the icon class for the button.
     */
    iconClass: string,
    /**
     * The label for the button. Used for accessibility only.
     */
    label: string,
    /**
     * The button variant.
     */
    btnVariant?: 'primary' | 'neutral' | 'info' | 'warning' | 'danger' | 'success'
  }>(), {
    btnVariant: 'primary'
  })


const emit = defineEmits<{
  (e: 'btn-click'): void
}>()
</script>

<style scoped lang="scss">
.end-button-wrapper {
  width: 100%;
  display: flex;
  gap: var(--space-sm);

  .add-button {
    aspect-ratio: 1;
  }
}
</style>
