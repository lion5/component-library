<template>
  <div class="tooltip">
    <button
      :class="['tooltip-trigger', { 'on-hover': showOnHover, 'selectable-content': isSelectable }]"
      :aria-labelledby="id"
    >
      <!-- @slot @deprecated should contain the icon that is used as trigger for the tooltip -->
      <slot name="tooltipIcon" />
      <!-- @slot should contain content that is always displayed. Is wrapped by the tooltip trigger -->
      <slot name="tooltipTriggerContent" />
    </button>
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
 * Creates a tooltip around the given input on hover and active.
 * The position can be changed by the css-custom-props --tooltip-left and --tooltip-right.
 * Please set only one of them at the time. The distance away from the icon should be described by the ch unit.
 */

import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'
import { useId } from 'vue'

defineSlots<{
  /**
   * Slot that contains the icon that is used as trigger for the tooltip.
   * @deprecated use tooltipTriggerContent instead
   */
  tooltipIcon: void,
  /**
   * Slot that contains content that is always displayed. Is wrapped by the tooltip trigger.
   *
   * @Since 0.24.0
   */
  tooltipTriggerContent: void,
  /**
   * Slot that contains the text that is displayed inside the tooltips box.
   */
  tooltipText: void
}>()

withDefaults(
  defineProps<{
    /**
     * Text that is displayed inside the tooltips box. The slot tooltipText will override this prop if set.
     */
    tooltipText?: string,
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

const id = useId()
</script>

<style lang="scss" scoped>
.tooltip {
  position: relative;
}

.tooltip-trigger {
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
  cursor: help;
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
  max-width: var(--tooltip-max-width, 30ch);
  padding: var(--tooltip-padding, var(--space-sm));
  z-index: 1;
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
