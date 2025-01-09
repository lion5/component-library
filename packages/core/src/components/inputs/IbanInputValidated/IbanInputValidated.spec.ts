import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import IbanInput from '@core/components/inputs/IbanInputValidated/IbanInputValidated.vue'

describe('IbanInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(IbanInput, {
      props: {
        name: 'iban-input'
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
    it(':label - "IBAN" is used if undefined', async () => {
      await wrapper.setProps({ label: undefined })
      expect(wrapper.find('label').text()).toBe('IBAN')
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':iban - is applied to input', async () => {
      await wrapper.setProps({ iban: 'DE12345678901112131415' })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('DE12 3456 7890 1112 1314 15')
    })
  })
  describe('@events', () => {
    it('@update:iban - does not emit if user inputs invalid characters', async () => {
      const input = wrapper.find('input')
      input.setValue('DE12 3456 7890 1112 1314 15')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:iban')
      expect(wrapper.emitted('update:iban')).toHaveLength(1)
      expect(wrapper.emitted('update:iban').at(0)).toStrictEqual(['DE12345678901112131415'])
      expect(wrapper.find('input').element.value).toBe('DE12 3456 7890 1112 1314 15')
    })
  })
})
