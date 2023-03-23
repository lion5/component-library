<template>
  <BaseBox class="info-box">
    <slot />
  </BaseBox>
</template>

<script lang="ts" setup>
import BaseBox from '@/atoms/boxes/BaseBox/BaseBox.vue'
</script>
<style lang="scss" scoped>
.info-box {
  --box-background-color: var(--color-primary-surface);
  --box-color: var(--color-font-1);
}
</style>
