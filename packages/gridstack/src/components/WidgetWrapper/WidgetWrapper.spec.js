import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import WidgetWrapper from '@gridstack/atoms/dashboard/WidgetWrapper/WidgetWrapper.vue'
import LoadingAnimation from '@gridstack/atoms/LoadingAnimation/LoadingAnimation.vue'
import ErrorBox from '@gridstack/atoms/boxes/ErrorBox/ErrorBox.vue'

describe('WidgetWrapper', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WidgetWrapper)
  })

  describe(':props', () => {
    it(':busy - hides loading animation if busy is false', async () => {
      await wrapper.setProps({
        busy: false
      })
      expect(wrapper.findComponent(LoadingAnimation).exists()).toBeFalsy()
    })
    it(':busy - display loading animation if busy is true', async () => {
      await wrapper.setProps({
        busy: true
      })
      expect(wrapper.findComponent(LoadingAnimation).exists()).toBeTruthy()
    })
    it(':error - show component when set', async () => {
      const expectedErrorMessage = new Error('test error')
      await wrapper.setProps({
        error: expectedErrorMessage
      })
      expect(wrapper.findComponent(ErrorBox).vm.error).toBe(
        expectedErrorMessage
      )
    })
  })
})
