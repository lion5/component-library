import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import CheckboxInput from './CheckboxInputV1Validated.vue'

describe('CheckboxInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(CheckboxInput, {
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
      expect(wrapper.findComponent(Field).vm.name).toBe(expectedName)
      expect(wrapper.findComponent(Field).attributes('id')).toBe(expectedName)
    })
    it(':name - is applied to ErrorMessage', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.findComponent(ErrorMessage).vm.name).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':type - is checkbox', async () => {
      expect(wrapper.findComponent(Field).attributes('type')).toBe('checkbox')
    })
    it(':value - is true', async () => {
      expect(wrapper.findComponent(Field).attributes('value')).toBe('true')
    })
  })
})
