<template>
  <div class="portal-single-metric-card">
    <h3 class="metric-name">
      {{ metricName }}
    </h3>
    <span class="value">{{ value }}</span>
  </div>
</template>

<script lang="ts" setup>
defineExpose<{
  /**
   * The name of the metric that shall be presented
   */
  metricName: string,
  /**
   * The value of the metric that shall be presented
   */
  value: number | string
}>()
</script>

<style lang="scss">
.portal-single-metric-card {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: .5rem 1rem;

  .metric-name {
    font-size: 1.3rem;
    font-weight: bold;
  }

  .value {
    font-size: 1.2rem;
  }
}
</style>
