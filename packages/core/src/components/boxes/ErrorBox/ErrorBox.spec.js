import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'

describe('ErrorBox', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ErrorBox)
  })

  describe(':props', () => {
    it(':error :errors - hides component when both are undefined', async () => {
      await wrapper.setProps({
        error: undefined,
        errors: undefined
      })
      expect(wrapper.find('.alert').exists()).toBeFalsy()
    })
    it(':error :errors - are combined viewed when both set', async () => {
      const error = new Error('New test error')
      const errors = [
        new Error('First error'),
        new Error('Second error'),
        new Error('Third error')
      ]
      await wrapper.setProps({
        error,
        errors
      })
      const errorMessages = wrapper.findAll('li')
      expect(errorMessages.at(0).text()).toBe(error.message)
      expect(errorMessages.at(1).text()).toBe(errors[0].message)
      expect(errorMessages.at(2).text()).toBe(errors[1].message)
      expect(errorMessages.at(3).text()).toBe(errors[2].message)
    })
    it(':error - display error message when set', async () => {
      const error = new Error('New test error')
      await wrapper.setProps({ error })
      const errorMessage = wrapper.find('span')
      expect(errorMessage.text()).toBe(error.message)
    })
    it(':errors - displays all error messages when set', async () => {
      const errors = [
        new Error('First error'),
        new Error('Second error'),
        new Error('Third error')
      ]
      await wrapper.setProps({ errors })
      const errorMessages = wrapper.findAll('li')
      expect(errorMessages.at(0).text()).toBe(errors[0].message)
      expect(errorMessages.at(1).text()).toBe(errors[1].message)
      expect(errorMessages.at(2).text()).toBe(errors[2].message)
    })
  })
})
