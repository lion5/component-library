<template>
  <BaseCard class="item-card">
    <slot />
  </BaseCard>
</template>
<script setup lang="ts">
import BaseCard from '@core/components/display/cards/BaseCard/BaseCard.vue'
</script>
<style scoped>
.item-card {
  --card-padding: var(--item-card-padding, 0);
}
</style>
