<template>
  <div
    :class="['popover-wrapper', { 'user-select-disabled': !isSelectable, 'show-on-hover': showOnHover }]"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <button
      :popovertarget="popoverId"
      popovertargetaction="show"
      class="popover-trigger"
      @click="onClicked"
    >
      <slot name="trigger" />
    </button>
    <BaseCard
      ref="popover"
      :id="popoverId"
      popover="auto"
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
  content?: void
}>()

const props = withDefaults(
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
    /**
     * Specifies the preferred position for the popover component.
     * This determines where the popover will be placed relative to its target element.
     * Example values may include "top", "bottom", "left", "right", or combinations such as "top-start".
     * The actual position may be adjusted if there is insufficient space.
     */
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
const opened = ref(false)

onMounted(() => {
  applyPolyfill()
})

const onMouseEnter = () => {
  if (!props.showOnHover) return
  if (clicked.value) return
  showPopover()
}

const onMouseLeave = () => {
  if (!props.showOnHover) return
  if (clicked.value) return
  hidePopover()
}
const onToggle = (event: ToggleEvent) => {
  const newState = event.newState === 'open'
  opened.value = newState
  if (!newState) {
    clicked.value = false
  }
}

const onClicked = () => {
  clicked.value = !clicked.value
  if (!clicked.value) {
    setTimeout(() => hidePopover(), 1)
  }
}
let hidePopoverTimeout: NodeJS.Timeout | undefined = undefined
const showPopover = () => {
  if (hidePopoverTimeout) {
    clearTimeout(hidePopoverTimeout)
  }
  popover.value?.$el.showPopover()
}

const hidePopover = () => {
  hidePopoverTimeout = setTimeout(() => popover.value?.$el.hidePopover(), 100)
}
</script>

<style lang="scss">
.popover-wrapper {
  anchor-scope: --popover;
  display: inline-block;

  &.user-select-disabled .popover-content {
    user-select: none;
  }

}

.popover-trigger {
  padding: 0;
  border-radius: var(--border-radius-100);
  anchor-name: --popover;
  width: fit-content;
  cursor: help;
  background: transparent;
  border: none;
}

.popover-content {
  position-anchor: --popover;
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
