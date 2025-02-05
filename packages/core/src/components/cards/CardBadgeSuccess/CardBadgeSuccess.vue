<template>
  <CardBadgeBase class="card-badge-success">
    <TooltipIcon
      :id="tooltipId"
      :tooltip-text="tooltipText"
      style="--tooltip-right: 0; --tooltip-bottom: 100%; --tooltip-max-width: 23ch;"
    >
      <template #tooltipIcon>
        <BaseIcon icon="bi-check" />
      </template>
    </TooltipIcon>
  </CardBadgeBase>
</template>

<style lang="scss" scoped>
.card-badge-success {
  --image-card-badge-color: var(--color-success);
  --image-card-badge-background-color: var(--color-success-100);
}
</style>
<script setup lang="ts">
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import CardBadgeBase from '@core/components/cards/CardBadgeBase/CardBadgeBase.vue'
import TooltipIcon from '@core/components/utils/TooltipIcon/TooltipIcon.vue'
import { useId } from 'vue'

defineProps<{
  /**
   * Is displayed when the user hovers over the badge
   */
  tooltipText: string
}>()

const tooltipId = useId()
</script>
