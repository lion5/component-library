<template>
  <div class="voucher-scan-option-header">
    <small>Option {{ optionId }}</small>
    <h3>{{ title }}</h3>
  </div>
</template>
<script lang="ts" setup>
defineProps<{
  optionId: number
  title: string
}>()
</script>
<style lang="scss" scoped>
.voucher-scan-option-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  small {
    font-size: 1rem;
    line-height: 1;
    color: var(--color-neutral-600);
  }

  h3 {
    font-size: 1.4rem;
    line-height: 1;
    text-align: start;
  }
}
</style>
