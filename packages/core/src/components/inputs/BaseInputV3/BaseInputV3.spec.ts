import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import BaseInputV3 from './BaseInputV3.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'

describe('BaseInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(BaseInputV3, {
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
      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
      expect(wrapper.find('input').attributes('id')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':type - default type is text', async () => {
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })
    it(':type - is applied to Field', async () => {
      const expectedType = 'email'
      await wrapper.setProps({ type: expectedType })
      expect(wrapper.find('input').attributes('type')).toBe(expectedType)
    })
    it(':error - is applied to ErrorMessage', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })
      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
  })
})
