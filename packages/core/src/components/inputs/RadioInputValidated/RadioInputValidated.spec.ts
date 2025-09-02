import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import RadioInputValidated from '@core/components/inputs/RadioInputValidated/RadioInputValidated.vue'
import { boolean } from 'yup'

describe('RadioInputValidated', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(RadioInputValidated, {
      props: {
        modelValue: false,
        name: 'name',
        label: 'label'
      }
    })
  })

  describe(':props', () => {
    it(':name - is applied to input and label', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('input').attributes('id')).toBe(expectedName)
      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
      expect(wrapper.find('label').attributes('for')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label .main-label').text()).toBe(expectedLabel)
      expect(wrapper.find('label .description').exists()).toBeFalsy()
    })

    it(':labelDescription - is rendered as span', async () => {
      const expectedDescription = 'Expected description'
      await wrapper.setProps({ labelDescription: expectedDescription })
      expect(wrapper.find('label .main-label').exists()).toBeTruthy()
      expect(wrapper.find('label .description').text()).toBe(expectedDescription)
    })

    it(':modelValue - is applied to input', async () => {
      await wrapper.setProps({ modelValue: true })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('true')
      expect(wrapper.find('input').element.checked).toBe(true)
    })

    it(':validationRules - asterisk is rendered if required', async () => {
      await wrapper.setProps({ validationRules: boolean().required() })
      expect(wrapper.find('.asterisk').exists()).toBeTruthy()
    })
  })

  describe('@events', () => {
    it(':update:modelValue - is triggered if radio-input is checked', async () => {
      const inputEl = wrapper.find('input')

      await inputEl.setChecked(true)

      expect(wrapper.emitted('update:modelValue')?.at(0)).toEqual([true])
    })
  })
})
