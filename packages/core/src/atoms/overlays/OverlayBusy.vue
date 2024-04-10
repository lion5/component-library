<template>
  <OverlayBase class="busy-overlay">
    <slot name="busyLoadingIcon"><LoadingAnimation /></slot>
    <slot name="busyText">Speichere...</slot>
  </OverlayBase>
</template>

<script lang="ts" setup>
import OverlayBase from '@core/atoms/overlays/OverlayBase.vue'
import { LoadingAnimation } from '@core/atoms'
</script>

<style lang="scss" scoped>
.busy-overlay {
  --overlay-background-color: var(--color-primary-surface);
  --overlay-color: var(--color-primary);
  --overlay-font-size: var(--font-size-4);

  & > .content .spinner-grow {
    width: var(--font-size-8);
    height: var(--font-size-8);
  }
}
</style>
