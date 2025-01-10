import { beforeEach, describe, expect, it } from 'vitest'
import { mount, shallowMount } from '@vue/test-utils'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'

describe('IconButton.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = shallowMount(IconButton)
  })
  describe(':props', () => {
    it(':disabled - set button disabled if set to true', async () => {
      await wrapper.setProps({ disabled: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })
    it(':disabled - unset button disabled if set to false', async () => {
      await wrapper.setProps({ disabled: false })
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })
    it(':busy - set busy class if set to true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.findComponent(ArrowRotateLoadingAnimation).exists()).toBeTruthy()
      expect(wrapper.find('button').classes('busy')).toBeTruthy()
    })
    it(':busy - unset busy class if set to false', async () => {
      await wrapper.setProps({ busy: false })
      expect(wrapper.findComponent(ArrowRotateLoadingAnimation).exists()).toBeFalsy()
      expect(wrapper.find('button').classes('busy')).toBeFalsy()
    })
  })
})
