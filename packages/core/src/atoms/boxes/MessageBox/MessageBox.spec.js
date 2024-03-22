import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import InfoBox from '@core/atoms/boxes/InfoBox/InfoBox.vue'
import MessageBox from '@core/atoms/boxes/MessageBox/MessageBox.vue'
import ErrorBox from '@core/atoms/boxes/ErrorBox/ErrorBox.vue'

describe('MessageBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MessageBox)
  })

  describe(':props', () => {
    it(':infoMessage - is applied to InfoBox', async () => {
      const expectedInfoMessage = 'test info message'
      await wrapper.setProps({
        infoMessage: expectedInfoMessage
      })
      expect(wrapper.findComponent(InfoBox).exists()).toBeTruthy()
      expect(wrapper.findComponent(InfoBox).vm.infoMessage).toBe(
        expectedInfoMessage
      )
      expect(wrapper.findComponent(ErrorBox).exists()).toBeFalsy()
    })
    it(':errorMessage - is applied to InfoBox', async () => {
      const expectedErrorMessage = 'test info message'
      await wrapper.setProps({
        errorMessage: expectedErrorMessage
      })
      expect(wrapper.findComponent(InfoBox).exists()).toBeFalsy()
      expect(wrapper.findComponent(ErrorBox).exists()).toBeTruthy()
      expect(wrapper.findComponent(ErrorBox).vm.error).toStrictEqual(
        new Error(expectedErrorMessage)
      )
    })
  })
})
