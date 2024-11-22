import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { ErrorMessage } from 'vee-validate'
import EuroCurrencyInput from '@core/components/inputs/EuroCurrencyInput/EuroCurrencyInput.vue'

describe('EuroCurrencyInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(EuroCurrencyInput, {
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
    it(':name - is applied to ErrorMessage', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.findComponent(ErrorMessage).vm.name).toBe(expectedName)
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
      await wrapper.setProps({ cents: 123 })
      const input = wrapper.find('input')
      await input.trigger('input', { data: 'a' })
      await input.trigger('input', { data: 'z' })
      await input.trigger('input', { data: '%' })
      await input.trigger('input', { data: '.' })
      await input.trigger('input', { data: ',' })
      await flushPromises()

      expect(wrapper.emitted()).not.toHaveProperty('update:euros')
      expect(wrapper.find('input').element.value).toBe('01,23')
    })
    it('@update:euros - emit 123 if user types 123 €', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '2' })
      await input.trigger('input', { data: '3' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:euros')
      expect(wrapper.emitted('update:euros')).toHaveLength(3)
      expect(wrapper.emitted('update:euros').at(0)).toStrictEqual([1])
      expect(wrapper.emitted('update:euros').at(1)).toStrictEqual([12])
      expect(wrapper.emitted('update:euros').at(2)).toStrictEqual([123])
      expect(wrapper.find('input').element.value).toBe('01,23')
    })
    it('@update:cents - emit 120 if user input 0 at last position of 00,12 €', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '2' })
      await input.trigger('input', { data: '0' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents')).toHaveLength(3)
      expect(wrapper.emitted('update:cents').at(0)).toStrictEqual([1])
      expect(wrapper.emitted('update:cents').at(1)).toStrictEqual([12])
      expect(wrapper.emitted('update:cents').at(2)).toStrictEqual([120])
      expect(wrapper.find('input').element.value).toBe('01,20')
    })
    it('@update:euros - emit 0 if last position deleted', async () => {
      await wrapper.setProps({ euros: 1 })
      const input = wrapper.find('input')
      await input.trigger('input', { data: '' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:euros')
      expect(wrapper.emitted('update:euros')).toHaveLength(1)
      expect(wrapper.emitted('update:euros').at(0)).toStrictEqual([0])
      expect(wrapper.find('input').element.value).toBe('00,00')
    })
  })
})
