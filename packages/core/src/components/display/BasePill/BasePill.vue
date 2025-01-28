<script setup lang="ts">
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'

defineProps<{
  label: string
  iconStartCls?: string,
  busy?: boolean
}>()
</script>

<template>
  <div class="pill">
    <span
      v-if="busy"
      class="start-icon"
    >
      <ArrowRotateLoadingAnimation />
    </span>
    <span
      v-else-if="iconStartCls"
      class="start-icon"
    >
      <BaseIcon :icon="iconStartCls" />
    </span>
    <span class="label">{{ label }}</span>
    <slot name="postfix" />
  </div>
</template>

<style scoped lang="scss">
.pill {
  display: flex;
  align-items: center;
  gap: var(--space-300);
  padding: var(--space-300) var(--space-400);
  width: max-content;
  background-color: var(--pill-background-color, var(--color-primary));
  color: var(--pill-color, var(--color-font-inverted));
  border-radius: var(--border-radius-round);
  line-height: 1;

  .start-icon {
    aspect-ratio: 1;
  }
}
</style>
