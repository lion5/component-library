<template>
  <div class="portal-tooltip">
    <IconButton :aria-labelledby="id">
      <!-- @slot should contain the icon that is used as trigger for the tooltip -->
      <slot name="tooltipIcon" />
    </IconButton>
    <BaseCard :id="id" role="tooltip">
      <!-- @slot content displayed in the tooltip box -->
      <slot name="tooltipText">
        {{ tooltipText }}
      </slot>
    </BaseCard>
  </div>
</template>
<script lang="ts" setup>
/**
 * Creates an icon with a tooltip on hover and active.
 * The position can be changed by the css-custom-props --tooltip-left and --tooltip-right.
 * Please set only one of them at the time. The distance away from the icon should be described by the ch unit.
 */

import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'

withDefaults(
  defineProps<{
    /**
     * Required to resolve the aria-label used by screen readers
     */
    id: string
    /**
     * Text that is displayed inside the tooltips box. The slot tooltipText will override this prop if set.
     */
    tooltipText: string
  }>(),
  { tooltipText: '' }
)
</script>

<style lang="scss" scoped>
.portal-tooltip {
  position: relative;
  max-width: min-content;
}

[role='tooltip'] {
  display: none;
  position: absolute;
  left: var(--tooltip-left, unset);
  right: var(--tooltip-right, unset);
  background-color: var(--white);
  width: max-content;
  max-width: 30ch;
}

button:hover + [role='tooltip'],
button:focus + [role='tooltip'] {
  display: block;
}

.tooltip-right {
  left: 0;
}

.tooltip-left {
  right: 0;
}
</style>
