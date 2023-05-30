<template>
  <div class="widget-wrapper">
    <LoadingAnimation v-if="busy" type="grow" class="loading-icon" />
    <!-- @slot the widgets content -->
    <slot />
    <ErrorBox :error="error" />
  </div>
</template>

<script lang="ts" setup>
import LoadingAnimation from '@/atoms/LoadingAnimation/LoadingAnimation.vue'
import ErrorBox from '@/atoms/boxes/ErrorBox/ErrorBox.vue'

defineProps<{
  /**
   * Should be true if the widget is in loading state
   */
  busy?: boolean
  /**
   * Should be set if the widget has a global error to display
   */
  error?: Error | undefined
}>()
</script>

<style lang="scss" scoped>
.widget-wrapper {
  --_padding: var(--widget-wrapper-padding, var(--space-sm));
  position: relative;
  padding: var(--_padding);

  .loading-icon {
    --size: var(--font-size-body);
    position: absolute;
    right: var(--space-sm);
    top: var(--space-sm);
  }
}
</style>
