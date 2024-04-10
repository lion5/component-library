<template>
  <div class="step-header">
    <small>Schritt {{ stepId }}</small>
    <h2>{{ title }}</h2>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  stepId: number
  title: string
}>()
</script>
<style lang="scss" scoped>
.step-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  small {
    font-size: 1rem;
    line-height: 1;
    color: var(--color-neutral-600);
  }

  h2 {
    font-size: 1.8rem;
    line-height: 1;
    text-align: start;
  }
}
</style>
