<template>
  <div
    class="popover-wrapper"
  >
    <button
      :popovertarget="popoverId"
      class="popover-trigger"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <slot name="trigger" />
    </button>
    <BaseCard
      ref="popover"
      :id="popoverId"
      popover
      :class="['popover-content', placement]"
      @toggle="onToggle"
    >
      <slot name="content">
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

import { onMounted, ref, useId } from 'vue'
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'
import { apply, isSupported } from '@oddbird/popover-polyfill/fn'
import polyfill from '@oddbird/css-anchor-positioning/fn'
import { PopoverPosition } from '@core/components/utils/Popover/popoverPositon'

const applyPolyfill = () => {
  if (!isSupported()) {
    apply()
  }
  if (!('anchorName' in document.documentElement.style)) {
    polyfill()
  }
}

defineSlots<{
  /**
   * Slot that contains the trigger element for the tooltip.
   */
  trigger: void
  /**
   * Slot that contains the text that is displayed inside the tooltips box.
   */
  content: void
}>()

withDefaults(
  defineProps<{
    /**
     * Text that is displayed inside the tooltips box. The slot tooltipText will override this prop if set.
     */
    tooltipText?: string
    /**
     * Determines if the content is selectable.
     */
    isSelectable?: boolean
    /**
     * Determines if the tooltip is only shown on focus.
     */
    showOnHover?: boolean,
    placement?: PopoverPosition
  }>(),
  {
    tooltipText: '',
    isSelectable: false,
    showOnHover: true,
    placement: 'top-left'
  }
)

const id = useId()
const popoverId = `popover-${id}`
const popover = ref<InstanceType<typeof BaseCard>>()
const clicked = ref(false)

onMounted(() => {
  applyPolyfill()
})

const onMouseEnter = () => {
  if (clicked.value) return
  console.log('enter')
  popover.value?.$el.showPopover()
}

const onMouseLeave = () => {
  if (clicked.value) return
  console.log('leave')
  popover.value?.$el.hidePopover()
}
const onToggle = (event: ToggleEvent) => {
  console.log('toggle', event)
  clicked.value = event.newState === 'open'
}
</script>

<style lang="scss">
.popover-wrapper {
  anchor-scope: --popover;
}

.popover-trigger {
  padding: 0;
  border-radius: var(--border-radius-100);
  anchor-name: --popover;
  width: fit-content;
}

.popover-content {
  position: absolute;
  position-anchor: --popover;
  /* Versuchen Sie diese alternative Fallback-Syntax */
  position-try-fallbacks: flip-inline,
  flip-block,
  flip-start;

  background-color: var(--color-neutral-100);
  margin: 0;
  border-style: none;
  inset: auto;

  &.top-left {
    top: auto;
    bottom: anchor(top);
    right: anchor(left);
    left: auto;
  }

  &.top-center {
    top: auto;
    bottom: anchor(top);
    right: auto;
    left: anchor(center);
    transform: translateX(-50%);
  }

  &.top-right {
    top: auto;
    bottom: anchor(top);
    right: auto;
    left: anchor(right);
  }

  &.middle-left {
    top: anchor(center);
    bottom: auto;
    right: anchor(left);
    left: auto;
    transform: translateY(-50%);
  }

  &.middle-right {
    top: anchor(center);
    bottom: auto;
    right: auto;
    left: anchor(right);
    transform: translateY(-50%);
  }

  &.bottom-left {
    top: anchor(bottom);
    bottom: auto;
    right: anchor(left);
    left: auto;
  }

  &.bottom-center {
    top: anchor(bottom);
    bottom: auto;
    right: auto;
    left: anchor(center);
    transform: translateX(-50%);
  }

  &.bottom-right {
    top: anchor(bottom);
    bottom: auto;
    right: auto;
    left: anchor(right);
  }

  &:popover-open {
    display: grid;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  &.\:popover-open {
    display: grid;
  }

  transition-behaviour: allow-discrete;
  transition: display .25s,
  opacity .25s ease-in-out,
  scale .25s;
}
</style>
