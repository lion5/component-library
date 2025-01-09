import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { defineRule } from 'vee-validate'
import BaseInputV2 from './BaseInputV2Validated.vue'

describe('BaseInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    // mock required validation rule
    defineRule('required', () => 'error message')

    wrapper = mount(BaseInputV2, {
      attachTo: document.body,
      props: {
        name: 'name',
        label: 'label',
        validationRules: 'required'
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
  })
})
