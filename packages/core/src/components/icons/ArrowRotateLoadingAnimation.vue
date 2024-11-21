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
  animation: rotate 1s infinite linear;
  line-height: 1;

  .bi::before {
    vertical-align: bottom;
  }
}

@keyframes rotate {
  0% {
    rotate: 0deg;
  }
  100% {
    rotate: 360deg;
  }
}
</style>
