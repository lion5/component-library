import CopyButton from './CopyButton.vue'
import { describe, beforeEach, it, expect, vi, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

describe('CopyButton.cue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeAll(() => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    })
  })
  beforeEach(() => {
    wrapper = mount(CopyButton)
  })
  describe(':props', () => {
    it('copyContent - IconButton not rendered if not provided', () => {
      expect(wrapper.findComponent(IconButton).exists()).toBe(false)
    })
    it('copyContent - IconButton rendered if provided', async () => {
      await wrapper.setProps({ copyContent: 'Hello World!' })
      expect(wrapper.findComponent(IconButton).exists()).toBe(true)
    })
  })
  describe('@events', () => {
    it('click - stores copyContent to clipboard', async () => {
      navigator.clipboard.writeText = vi.fn()
      await wrapper.setProps({ copyContent: 'Hello World!' })
      await wrapper.find('button').trigger('click')
      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('Hello World!')
    })
  })
})
