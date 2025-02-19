import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import TextareaInput from './TextareaInput.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'

describe('TextareaInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(TextareaInput, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to Field', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('textarea').attributes('name')).toBe(expectedName)
      expect(wrapper.find('textarea').attributes('id')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':error - is applied to ErrorMessage', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })
      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
    it(':maxlength - is applied to Field', async () => {
      const expectedMaxLength = '4'
      await wrapper.setProps({ maxlength: expectedMaxLength })
      expect(wrapper.find('textarea').attributes('maxlength')).toBe(expectedMaxLength)
    })
  })
})
