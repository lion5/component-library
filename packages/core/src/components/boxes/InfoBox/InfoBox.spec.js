import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import InfoBox from '@core/components/boxes/InfoBox/InfoBox.vue'
import IconInfoCircle from '@core/icons/IconInfoCircle.vue'

describe('InfoBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(InfoBox)
  })

  describe(':props', () => {
    it(':infoMessage - hides component when undefined', async () => {
      await wrapper.setProps({
        infoMessage: undefined
      })
      expect(wrapper.findComponent(IconInfoCircle).exists()).toBeFalsy()
    })
    it(':infoMessage - show component when set', async () => {
      const expectedInfoMessage = 'test info message'
      await wrapper.setProps({
        infoMessage: expectedInfoMessage
      })
      expect(wrapper.text()).toContain(expectedInfoMessage)
    })
  })
})
