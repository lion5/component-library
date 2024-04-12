<template>
  <BaseCard class="single-metric-card">
    <h3 class="metric-name">
      {{ metricName }}
    </h3>
    <span class="value">{{ value }}</span>
  </BaseCard>
</template>

<script lang="ts" setup>
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'

defineProps<{
  /**
   * The name of the metric that shall be presented
   */
  metricName: string
  /**
   * The value of the metric that shall be presented
   */
  value: number | string
}>()
</script>

<style lang="scss">
.single-metric-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--space-sm);
  & > * {
    margin: 0;
  }
  .metric-name {
    font-size: 1.3rem;
    font-weight: bold;
  }
  .value {
    font-size: 1.2rem;
  }
}
</style>
