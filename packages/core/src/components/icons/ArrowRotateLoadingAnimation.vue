<template>
  <div class="rotate-animation">
    <BaseIcon icon="bi-arrow-repeat" />
  </div>
</template>
<script lang="ts" setup>
import BaseIcon from '@core/components/icons/BaseIcon.vue'
</script>
<style lang="scss" scoped>
.rotate-animation {
  --_size: var(--size, var(--font-size-body));
  width: var(--_size);
  height: var(--_size);
  font-size: var(--_size);
  animation: rotate 1s infinite linear;
}

@keyframes rotate {
  to {
    rotate: 1turn;
  }
}
</style>
