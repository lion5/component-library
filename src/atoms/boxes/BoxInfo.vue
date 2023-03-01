<template>
  <BoxBase class="info-box">
    <slot />
  </BoxBase>
</template>

<script lang="ts" setup>
import BoxBase from '@/base/components/BoxBase.vue'
</script>
<style lang="scss" scoped>
.info-box {
  --box-background-color: var(--color-primary-surface);
  --box-color: var(--color-font-1);
}
</style>
