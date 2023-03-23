<template>
  <OverlayBase class="error-overlay">
    <IconExclamationTriangle/>
  </OverlayBase>
</template>

<script lang="ts" setup>
import IconExclamationTriangle from "@/icons/IconExclamationTriangle.vue";
import OverlayBase from "@/atoms/overlays/OverlayBase.vue";
</script>

<style lang="scss" scoped>
.error-overlay {
  --overlay-background-color: var(--color-danger-surface);
  --overlay-color: var(--color-danger);
  --overlay-font-size: var(--font-size-7);
}
</style>
