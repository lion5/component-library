import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import EditableEntityCard from '@core/components/cards/EditableEntityCard/EditableEntityCard.vue'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'

describe('EditableEntityCard.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  const mountPillInput = () => {
    wrapper = mount(EditableEntityCard, {
      props: {
        title: 'Test Title',
        modelValue: false
      },
      slots: {
        'info-content': '<div class="info-content">Info Content</div>',
        'form-content': '<div class="form-content">Edit Content</div>'
      }
    })
  }

  beforeEach(() => {
    mountPillInput()
  })
  afterEach(() => {
    vi.resetAllMocks()
  })
  describe(':props', () => {
    it(':title - is rendered', () => {
      expect(wrapper.text()).toContain('Test Title')
    })
    it(':modelValue - displays edit button if false', () => {
      expect(wrapper.find('.edit-button').exists()).toBe(true)
      expect(wrapper.find('.cancel-button').exists()).toBe(false)
    })
    it(':modelValue - displays cancel button if true', async () => {
      await wrapper.setProps({ modelValue: true })

      expect(wrapper.find('.cancel-button').exists()).toBe(true)
      expect(wrapper.find('.edit-button').exists()).toBe(false)
    })
    it(':modelValue - displays info content if false', async () => {
      await wrapper.setProps({ modelValue: false })

      expect(wrapper.find('.info-content').exists()).toBe(true)
      expect(wrapper.find('.form-content').exists()).toBe(false)
    })
    it(':modelValue - displays edit content if true', async () => {
      await wrapper.setProps({ modelValue: true })

      expect(wrapper.find('.form-content').exists()).toBe(true)
      expect(wrapper.find('.info-content').exists()).toBe(false)
    })
  })
  describe('@events', () => {
    it('@click - emits edit mode true', async () => {
      await wrapper.setProps({ modelValue: false })
      wrapper.find('.edit-button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:modelValue')).toBeDefined()
      expect(wrapper.emitted('update:modelValue')?.at(0)).toEqual([true])
    })
    it('@click - emits edit mode false', async () => {
      await wrapper.setProps({ modelValue: true })
      wrapper.find('.cancel-button').trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:modelValue')).toBeDefined()
      expect(wrapper.emitted('update:modelValue')?.at(0)).toEqual([false])
    })
  })
})
