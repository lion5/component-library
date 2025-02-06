<template>
  <OverlayBase class="busy-overlay">
    <slot name="busyLoadingIcon"><LoadingAnimation /></slot>
    <slot name="busyText">Speichere...</slot>
  </OverlayBase>
</template>

<script lang="ts" setup>
import OverlayBase from '@core/components/overlays/OverlayBase.vue'
import LoadingAnimation from '@core/components/utils/LoadingAnimation/LoadingAnimation.vue'
</script>

<style lang="scss" scoped>
.busy-overlay {
  --overlay-background-color: var(--color-primary-surface);
  --overlay-color: var(--color-primary);
  --overlay-font-size: var(--font-size-4);

  & > .content .spinner-grow {
    width: var(--font-size-7);
    height: var(--font-size-7);
  }
}
</style>
