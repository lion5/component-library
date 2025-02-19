import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import EuroInput from '@core/components/inputs/EuroInputValidated/EuroInputValidated.vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'

describe('EuroInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(EuroInput, {
      props: {
        name: 'name'
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
    it(':name - is applied to base input', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.findComponent(BaseInputV3).props().name).toBe(expectedName)
    })
    it(':label - "Betrag" is used if undefined', async () => {
      await wrapper.setProps({ label: undefined })
      expect(wrapper.find('label').text()).toBe('Betrag')
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':euros - are applied to input', async () => {
      await wrapper.setProps({ euros: 1234 })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('1234')
    })
  })

  describe('@events', () => {
    it('@update:euros - does not emit if user inputs invalid characters', async () => {
      await wrapper.setProps({ euros: 123 })
      const input = wrapper.find('input')
      await input.setValue('123az%.,-')
      await flushPromises()

      expect(wrapper.emitted()).not.toHaveProperty('update:euros')
      expect(wrapper.getComponent(BaseInputV3).props().modelValue).toBe('123')
    })
    it('@update:euros - emit 123 if user types 123 €', async () => {
      const input = wrapper.find('input')
      await input.setValue('123')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:euros')
      expect(wrapper.emitted('update:euros')).toHaveLength(1)
      expect(wrapper.emitted('update:euros').at(0)).toStrictEqual([123])
      expect(wrapper.getComponent(BaseInputV3).props().modelValue).toBe('123')
    })
    it('@update:euros - emit 0 if last position deleted', async () => {
      await wrapper.setProps({ euros: 1 })
      const input = wrapper.find('input')
      await input.setValue('')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:euros')
      expect(wrapper.emitted('update:euros')).toHaveLength(1)
      expect(wrapper.emitted('update:euros').at(0)).toStrictEqual([0])
      expect(wrapper.getComponent(BaseInputV3).props().modelValue).toBe('0')
    })
  })
})
