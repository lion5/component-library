<template>
  <BaseIcon icon="bi-circle-fill" />
</template>
<script lang="ts" setup>
import BaseIcon from '@core/components/icons/BaseIcon.vue'
</script>
<style lang="scss" scoped>
.bi::before {
  animation: grow var(--animation-duration, 0.8s) infinite ease-in;
}

@keyframes grow {
  0% {
    scale: 0.1;
    opacity: 0;
  }
  100% {
    scale: 1;
    opacity: 1;
  }
}
</style>
