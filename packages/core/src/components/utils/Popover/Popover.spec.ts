import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import Popover from './Popover.vue'

// Mock polyfills
vi.mock('@oddbird/popover-polyfill/fn', () => ({
  apply: vi.fn(),
  isSupported: vi.fn(() => true)
}))

vi.mock('@oddbird/css-anchor-positioning/fn', () => ({
  default: vi.fn()
}))

const mockShowPopover = vi.fn()
const mockHidePopover = vi.fn()

describe('Popover.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    vi.clearAllMocks()

    wrapper = mount(Popover, {
      attachTo: document.body,
      props: {
        tooltipText: 'Hello Tooltip'
      },
      slots: {
        trigger: '<span>Trigger</span>',
        content: ''
      }
    })

    // Mock popover API on the rendered popover element
    const popoverEl = wrapper.find('[popover]').element as HTMLElement
    popoverEl.showPopover = mockShowPopover
    popoverEl.hidePopover = mockHidePopover
  })

  describe(':props', () => {
    it(':tooltipText - is rendered inside popover content', () => {
      expect(wrapper.find('[popover]').text()).toContain('Hello Tooltip')
    })

    it(':placement - default placement is top-left', () => {
      expect(wrapper.find('[popover]').classes()).toContain('top-left')
    })

    it(':placement - is applied as css class on popover content', async () => {
      await wrapper.setProps({ placement: 'bottom-center' })
      expect(wrapper.find('[popover]').classes()).toContain('bottom-center')
    })
  })

  describe(':slots', () => {
    it('trigger slot - renders content inside trigger button', () => {
      expect(wrapper.find('button').html()).toContain('<span>Trigger</span>')
    })

    it('content slot - renders slot content instead of tooltipText', () => {
      const wrapperWithSlot = mount(Popover, {
        attachTo: document.body,
        props: { tooltipText: 'Should not appear' },
        slots: {
          trigger: '<span>Trigger</span>',
          content: '<p>Custom Content</p>'
        }
      })
      expect(wrapperWithSlot.find('[popover]').html()).toContain('<p>Custom Content</p>')
      expect(wrapperWithSlot.find('[popover]').text()).not.toContain('Should not appear')
    })
  })

  describe('@events', () => {
    it('@mouseenter - shows popover on mouse enter', async () => {
      await wrapper.find('button').trigger('mouseenter')
      expect(mockShowPopover).toHaveBeenCalledTimes(1)
    })

    it('@mouseleave - hides popover on mouse leave', async () => {
      await wrapper.find('button').trigger('mouseleave')
      expect(mockHidePopover).toHaveBeenCalledTimes(1)
    })

    it('@click - first click calls hidePopover to close hover state; popovertarget then pins it open', async () => {
      await wrapper.find('button').trigger('click')
      expect(mockHidePopover).toHaveBeenCalledTimes(1)
      expect(mockShowPopover).not.toHaveBeenCalled()
    })

    it('@click - second click does not call show/hide; popovertarget closes it', async () => {
      await wrapper.find('button').trigger('click')
      mockHidePopover.mockClear()

      await wrapper.find('button').trigger('click')
      expect(mockShowPopover).not.toHaveBeenCalled()
      expect(mockHidePopover).not.toHaveBeenCalled()
    })

    it('@mouseenter - does not show popover when clicked state is active', async () => {
      await wrapper.find('button').trigger('click')
      mockShowPopover.mockClear()

      await wrapper.find('button').trigger('mouseenter')
      expect(mockShowPopover).not.toHaveBeenCalled()
    })

    it('@mouseleave - does not hide popover when clicked state is active', async () => {
      await wrapper.find('button').trigger('click')
      mockHidePopover.mockClear()

      await wrapper.find('button').trigger('mouseleave')
      expect(mockHidePopover).not.toHaveBeenCalled()
    })
  })

  describe('accessibility', () => {
    it('trigger button has aria-label', () => {
      expect(wrapper.find('button').attributes('aria-label')).toBe('Tooltip Trigger')
    })

    it('trigger button has type="button"', () => {
      expect(wrapper.find('button').attributes('type')).toBe('button')
    })

    it('trigger button has popovertarget pointing to popover id', () => {
      const triggerId = wrapper.find('button').attributes('popovertarget')
      const popoverId = wrapper.find('[popover]').attributes('id')
      expect(triggerId).toBe(popoverId)
    })
  })
})
