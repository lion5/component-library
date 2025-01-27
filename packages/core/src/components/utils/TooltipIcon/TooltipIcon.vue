<template>
  <div class="tooltip">
    <IconButton
      :class="{ 'on-hover': showOnHover }"
      :aria-labelledby="id"
    >
      <!-- @slot should contain the icon that is used as trigger for the tooltip -->
      <span :class="{ 'selectable-content': isSelectable }">
        <slot name="tooltipIcon" />
      </span>
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
    tooltipText: string,
    /**
     * Determines if the content is selectable.
     */
    isSelectable?: boolean
    /**
     * Determines if the tooltip is only shown on focus.
     */
    showOnHover?: boolean
  }>(),
  {
    tooltipText: '',
    isSelectable: false,
    showOnHover: true
  }
)
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
}

[role='tooltip'] {
  display: none;
  position: absolute;
  left: var(--tooltip-left, unset);
  right: var(--tooltip-right, unset);
  bottom: var(--tooltip-bottom, unset);
  top: var(--tooltip-top, unset);
  background-color: var(--color-white);
  width: max-content;
  max-width: 30ch;
}


button.on-hover:hover + [role='tooltip'],
button:focus + [role='tooltip'],
[role='tooltip']:hover,
[role='tooltip']:focus-within,
[role='tooltip']:focus,
[role='tooltip']:active {
  display: block;
}

button:not(.on-hover) {
  cursor: pointer;
}

.tooltip-right {
  left: 0;
}

.tooltip-left {
  right: 0;
}

.selectable-content {
  user-select: text;
  cursor: text;
}
</style>
