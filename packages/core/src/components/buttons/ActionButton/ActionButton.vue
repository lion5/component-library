<script setup lang="ts">
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

withDefaults(defineProps<{ busy?: boolean; disabled?: boolean }>(), {
  busy: false,
  disabled: false
})
</script>
<template>
  <IconButton
    :class="{ 'action-button': true, busy: busy }"
    v-bind="$attrs"
    :disabled="disabled || busy"
    aria-label="Aktion durchführen"
  >
    <!-- @slot the icon that shall be displayed -->
    <slot />
  </IconButton>
</template>
<style lang="scss" scoped>
.action-button {
  display: grid;
  place-content: center;
  font-size: var(--font-size-4);
  padding: var(--space-sm);
  background-color: var(--color-primary);
  color: var(--color-font-inverted);
  width: var(--font-size-6);
  height: var(--font-size-6);
  border-radius: 50%;
  line-height: 1;
  cursor: pointer;

  &:not([disabled]):hover,
  &:not([disabled]):active {
    background-color: var(--color-primary-hover);
  }

  &.busy {
    animation: rotate linear 1s infinite;
  }

  &[disabled] {
    cursor: default;
    opacity: 0.5;
  }
}

@keyframes rotate {
  0% {
    rotate: 0deg;
  }

  100% {
    rotate: 360deg;
  }
}
</style>
