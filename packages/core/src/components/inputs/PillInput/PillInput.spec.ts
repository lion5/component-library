import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import PillInput from '@core/components/inputs/PillInput/PillInput.vue'
import BasePill from '@core/components/display/BasePill/BasePill.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'

describe('PillInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  const mountPillInput = () => {
    wrapper = mount(PillInput, {
      props: {
        label: 'Label',
        busy: false
      }
    })
  }

  beforeEach(() => {
    mountPillInput()
  })
  afterEach(() => {
    wrapper.unmount()
    vi.resetAllMocks()
  })
  describe(':props', () => {
    it(':label - is applied to BasePill', async () => {
      const expectedLabel = 'Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.findComponent(BasePill).props().label).toBe(expectedLabel)
    })
    it(':busy - set IconButton disabled if busy', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.findComponent(IconButton).props().disabled).toBeTruthy()
    })
    it(':busy - ArrowRotateLoadingAnimation hidden if false', async () => {
      await wrapper.setProps({ busy: false })
      expect(wrapper.findComponent(ArrowRotateLoadingAnimation).exists()).toBe(false)
      expect(wrapper.find('.delete-icon').exists()).toBeTruthy()
    })
    it(':busy - ArrowRotateLoadingAnimation visible if true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.findComponent(ArrowRotateLoadingAnimation).exists()).toBe(true)
      expect(wrapper.find('.delete-icon').exists()).toBeFalsy()
    })
    it(':iconCls - is applied to BasePill', async () => {
      const expectedIconCls = 'expectedIconCls'
      await wrapper.setProps({ iconCls: expectedIconCls })
      expect(wrapper.findComponent(BasePill).props().iconStartCls).toBe(expectedIconCls)
    })
  })
  describe('@events', () => {
    it('@click - emits @delete', async () => {
      wrapper.findComponent(IconButton).vm.$emit('click')
      await nextTick()

      expect(wrapper.emitted('delete')).toBeDefined()
    })
  })
})
