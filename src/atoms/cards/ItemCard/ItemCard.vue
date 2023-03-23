<template>
  <BaseCard class="item-card">
    <slot />
  </BaseCard>
</template>
<style scoped>
.item-card {
  --card-padding: var(--item-card-padding, 0);
}
</style>
<script setup lang="ts">
import BaseCard from '@/atoms/cards/BaseCard/BaseCard.vue'
</script>
