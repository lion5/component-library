import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import Popover from './Popover.vue'
import BaseCard from '@core/components/cards/BaseCard/BaseCard.vue'

describe('Popover.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  let showPopoverSpy: ReturnType<typeof vi.fn>
  let hidePopoverSpy: ReturnType<typeof vi.fn>

  beforeEach(() => {
    vi.useFakeTimers()

    // Create spies
    showPopoverSpy = vi.fn()
    hidePopoverSpy = vi.fn()

    // Mock HTMLElement.prototype methods
    HTMLElement.prototype.showPopover = showPopoverSpy
    HTMLElement.prototype.hidePopover = hidePopoverSpy

    wrapper = mount(Popover, {
      slots: {
        trigger: '<span>Trigger</span>',
        content: '<span>Content</span>'
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  describe(':props', () => {
    it(':tooltipText - renders tooltip text in BaseCard', async () => {
      const expectedText = 'Expected tooltip text'
      wrapper = mount(Popover, {
        props: { tooltipText: expectedText },
        slots: {
          trigger: '<span>Trigger</span>'
        }
      })
      const baseCard = wrapper.findComponent(BaseCard)
      expect(baseCard.text()).toContain(expectedText)
    })

    it(':isSelectable - default is false', async () => {
      expect(wrapper.classes()).toContain('user-select-disabled')
    })

    it(':isSelectable - prevents content selection when false', async () => {
      await wrapper.setProps({ isSelectable: false })
      const baseCard = wrapper.findComponent(BaseCard)

      expect(wrapper.classes()).toContain('user-select-disabled')

      const styles = window.getComputedStyle(baseCard.element)
      expect(styles.userSelect).toBe('none')
    })

    it(':isSelectable - allows content selection when true', async () => {
      await wrapper.setProps({ isSelectable: true })
      const baseCard = wrapper.findComponent(BaseCard)

      expect(wrapper.classes()).not.toContain('user-select-disabled')

      const styles = window.getComputedStyle(baseCard.element)
      expect(styles.userSelect).toBe('')
    })

    it(':placement - default is top-left', async () => {
      const baseCard = wrapper.findComponent(BaseCard)
      expect(baseCard.classes()).toContain('top-left')
    })

    it(':placement - applied to BaseCard', async () => {
      await wrapper.setProps({ placement: 'bottom-center' })
      const baseCard = wrapper.findComponent(BaseCard)
      expect(baseCard.classes()).toContain('bottom-center')
    })
  })

  describe('@events', () => {
    it('@mouseenter - shows tooltip on hover when showOnHover is true and not clicked', async () => {
      const wrapperDiv = wrapper.find('.popover-wrapper')

      showPopoverSpy.mockClear()
      hidePopoverSpy.mockClear()

      await wrapperDiv.trigger('mouseenter')
      expect(showPopoverSpy).toHaveBeenCalledTimes(1)

      await wrapperDiv.trigger('mouseleave')
      await vi.runAllTimersAsync()
      expect(hidePopoverSpy).toHaveBeenCalled()
    })

    it('@mouseenter - on hover has no effect when showOnHover is false', async () => {
      await wrapper.setProps({ showOnHover: false })
      const wrapperDiv = wrapper.find('.popover-wrapper')

      showPopoverSpy.mockClear()
      hidePopoverSpy.mockClear()

      await wrapperDiv.trigger('mouseenter')
      expect(showPopoverSpy).not.toHaveBeenCalled()

      await wrapperDiv.trigger('mouseleave')
      await vi.runAllTimersAsync()
      expect(hidePopoverSpy).not.toHaveBeenCalled()
    })

    it('@click - toggles tooltip visibility on click', async () => {
      const button = wrapper.find('.popover-trigger')

      showPopoverSpy.mockClear()
      hidePopoverSpy.mockClear()

      // First click sets clicked state to true
      await button.trigger('click')

      // Second click sets clicked state to false and hides
      await button.trigger('click')
      await vi.runAllTimersAsync()
      expect(hidePopoverSpy).toHaveBeenCalled()
    })

    it('@click - tooltip persists after click when showOnHover is enabled', async () => {
      const wrapperDiv = wrapper.find('.popover-wrapper')
      const button = wrapper.find('.popover-trigger')

      showPopoverSpy.mockClear()
      hidePopoverSpy.mockClear()

      // Hover to show tooltip
      await wrapperDiv.trigger('mouseenter')
      expect(showPopoverSpy).toHaveBeenCalledTimes(1)

      // Click to persist
      await button.trigger('click')
      await vi.runAllTimersAsync()

      // Hover leave should not hide the tooltip
      await wrapperDiv.trigger('mouseleave')
      await vi.runAllTimersAsync()
      expect(hidePopoverSpy).not.toHaveBeenCalled()
    })

    it('@click - click overrules hover behavior (no autoclose)', async () => {
      const wrapperDiv = wrapper.find('.popover-wrapper')
      const button = wrapper.find('.popover-trigger')

      showPopoverSpy.mockClear()
      hidePopoverSpy.mockClear()

      // Click to show tooltip
      await button.trigger('click')

      // Hover actions should be ignored
      await wrapperDiv.trigger('mouseenter')
      await wrapperDiv.trigger('mouseleave')
      await vi.runAllTimersAsync()

      expect(hidePopoverSpy).not.toHaveBeenCalled()
    })
  })

  describe('component', () => {
    it('generates unique popover ID', () => {
      const button = wrapper.find('.popover-trigger')
      const baseCard = wrapper.findComponent(BaseCard)
      const popoverId = button.attributes('popovertarget')
      expect(popoverId).toBeTruthy()
      expect(baseCard.attributes('id')).toBe(popoverId)
    })

    it(':trigger slot - renders trigger slot content', () => {
      const trigger = wrapper.find('.popover-trigger')
      expect(trigger.text()).toContain('Trigger')
    })

    it(':content slot - renders content slot', () => {
      const baseCard = wrapper.findComponent(BaseCard)
      expect(baseCard.text()).toContain('Content')
    })
  })
})
