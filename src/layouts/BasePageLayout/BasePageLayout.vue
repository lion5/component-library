<template>
  <div class="voucher-invalidation-layout">
    <slot name="headline" />
    <slot name="content" />
  </div>
</template>
<script lang="ts" setup>
</script>
<style lang="scss" scoped>
.voucher-invalidation-layout {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-md);
  padding-inline: var(--space-sm);
  padding-top: var(--space-sm);
  margin-bottom: var(--space-lg);

  & > * {
    max-width: 60ch;
  }
}
</style>
