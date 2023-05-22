import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { ErrorMessage, Field } from 'vee-validate'
import BaseInputV2 from './BaseInputV2.vue'

describe('BaseInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(BaseInputV2, {
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
    it(':type - default type is text', async () => {
      expect(wrapper.findComponent(Field).attributes('type')).toBe('text')
    })
    it(':type - is applied to Field', async () => {
      const expectedType = 'email'
      await wrapper.setProps({ type: expectedType })
      expect(wrapper.findComponent(Field).attributes('type')).toBe(expectedType)
    })
  })
})
