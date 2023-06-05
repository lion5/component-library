<template>
  <div class="widget-wrapper">
    <LoadingAnimation v-if="busy" class="loading-icon" />
    <slot />
    <ErrorBox :error="error" />
  </div>
</template>

<script lang="ts" setup>
import { ErrorBox, LoadingAnimation } from '@lion5/component-library'

defineProps<{
  busy?: boolean
  error?: Error | undefined
}>()
</script>

<style lang="scss" scoped>
.widget-wrapper {
  position: relative;
  padding: var(--space-md) var(--space-sm);

  .loading-icon {
    --size: var(--font-size-body);
    position: absolute;
    right: var(--space-sm);
    top: var(--space-sm);
  }
}
</style>
