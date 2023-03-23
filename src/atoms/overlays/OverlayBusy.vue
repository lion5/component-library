<template>
  <OverlayBase class="busy-overlay">
    <div
      class="spinner-grow"
      role="status"
    />
    Speichere...
  </OverlayBase>
</template>

<script lang="ts" setup>
import OverlayBase from "@/atoms/overlays/OverlayBase.vue";
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
