import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import NumberInput from './NumberInputValidated.vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'

describe('NumberInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(NumberInput, {
      props: {
        name: 'name',
        label: 'label',
        modelValue: 0
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to input', async () => {
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
    it(':type - type is number', async () => {
      expect(wrapper.find('input').attributes('type')).toBe('number')
    })
  })
  describe('vee-validate', () => {
    it('@update:modelValue - returns 123 if BaseInputV3 emit "123" string', async () => {
      await wrapper.getComponent(BaseInputV3).vm.$emit('update:modelValue', '123')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([123])
    })
    it('@update:modelValue - returns undefined if BaseInputV3 emit empty string', async () => {
      await wrapper.getComponent(BaseInputV3).vm.$emit('update:modelValue', '')

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([undefined])
    })
  })
})
