<script setup lang="ts">
/**
 * A list of pills.
 */
import { Pill } from '@core/components/display/PillList/pill'
import BasePill from '@core/components/display/BasePill/BasePill.vue'

defineProps<{
  /**
   * The pills to display.
   */
  pills: Pill[]
}>()
</script>

<template>
  <div class="pill-list">
    <BasePill
      v-for="pill in pills"
      :key="pill.id"
      :label="pill.label"
      :icon-start-cls="pill.iconCls"
      :busy="pill.busy"
      :tooltip-text="pill.tooltipText"
      :tooltip-show-on-hover="pill.tooltipShowOnHover"
    />
  </div>
</template>

<style scoped lang="scss">
.pill-list {
  display: flex;
  gap: var(--space-300);
  flex-wrap: wrap;
}
</style>
