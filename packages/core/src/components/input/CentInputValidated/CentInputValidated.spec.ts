import { beforeEach, describe, expect, it, vi } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import CentInput from './CentInputValidated.vue'
import BaseInputV3 from '@core/components/input/BaseInputV3/BaseInputV3.vue'

describe('CentInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(CentInput, {
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
    it(':cents - are applied to input', async () => {
      await wrapper.setProps({ cents: 1234 })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('12,34')
    })
  })

  describe('@events', () => {
    it('@beforeinput - calls preventDefault for non-digit characters', async () => {
      const input = wrapper.find('input')
      const event = new InputEvent('beforeinput', {
        data: 'a',
        bubbles: true,
        cancelable: true
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      input.element.dispatchEvent(event)
      await flushPromises()

      expect(preventDefaultSpy).toHaveBeenCalledOnce()
    })
    it('@beforeinput - calls preventDefault for leading zero when value is empty', async () => {
      const localWrapper = mount(CentInput, {
        props: {
          name: 'name',
          cents: null as unknown as number
        }
      })
      const input = localWrapper.find('input')
      const event = new InputEvent('beforeinput', {
        data: '0',
        bubbles: true,
        cancelable: true
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      input.element.dispatchEvent(event)
      await flushPromises()

      expect(preventDefaultSpy).toHaveBeenCalledOnce()
    })
    it('@beforeinput - does not call preventDefault for delete inputType', async () => {
      const input = wrapper.find('input')
      const event = new InputEvent('beforeinput', {
        inputType: 'deleteContentBackward',
        bubbles: true,
        cancelable: true
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      input.element.dispatchEvent(event)
      await flushPromises()

      expect(preventDefaultSpy).not.toHaveBeenCalled()
    })
    it('@update:cents - does not emit if user input 0 at first position', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '0' })
      await flushPromises()

      expect(wrapper.emitted()).not.toHaveProperty('update:cents')
      expect(wrapper.find('input').element.value).toBe('00,00')
    })
    it('@update:cents - does not emit if user inputs invalid characters', async () => {
      await wrapper.setProps({ cents: 123 })
      const input = wrapper.find('input')
      await input.trigger('input', { data: 'a' })
      await input.trigger('input', { data: 'z' })
      await input.trigger('input', { data: '%' })
      await input.trigger('input', { data: '.' })
      await input.trigger('input', { data: ',' })
      await flushPromises()

      expect(wrapper.emitted()).not.toHaveProperty('update:cents')
      expect(wrapper.find('input').element.value).toBe('01,23')
    })
    it('@update:cents - emit 123 if user types 1,23 €', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '2' })
      await input.trigger('input', { data: '3' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents')).toHaveLength(3)
      expect(wrapper.emitted('update:cents').at(0)).toStrictEqual([1])
      expect(wrapper.emitted('update:cents').at(1)).toStrictEqual([12])
      expect(wrapper.emitted('update:cents').at(2)).toStrictEqual([123])
      expect(wrapper.find('input').element.value).toBe('01,23')
    })
    it('@update:cents - sanitizes mixed pasted text and emits only digits', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: 'a1b2' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents')).toHaveLength(1)
      expect(wrapper.emitted('update:cents').at(0)).toStrictEqual([12])
      expect(wrapper.find('input').element.value).toBe('00,12')
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
    it('@update:cents - emit 12 if user deletes the last position', async () => {
      await wrapper.setProps({ cents: 123 })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents')).toHaveLength(1)
      expect(wrapper.emitted('update:cents').at(0)).toStrictEqual([12])
      expect(wrapper.find('input').element.value).toBe('00,12')
    })
    it('@update:cents - calls preventDefault when user deletes the last position', async () => {
      await wrapper.setProps({ cents: 123 })
      await flushPromises()

      const input = wrapper.find('input')
      const event = new KeyboardEvent('keydown', {
        key: 'Backspace',
        bubbles: true,
        cancelable: true
      })
      const preventDefaultSpy = vi.spyOn(event, 'preventDefault')

      input.element.dispatchEvent(event)
      await flushPromises()

      expect(preventDefaultSpy).toHaveBeenCalledOnce()
    })
    it('@update:cents - emit 0 if last position deleted', async () => {
      await wrapper.setProps({ cents: 1 })
      const input = wrapper.find('input')
      await input.trigger('keydown', { key: 'Backspace' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents')).toHaveLength(1)
      expect(wrapper.emitted('update:cents').at(0)).toStrictEqual([0])
      expect(wrapper.find('input').element.value).toBe('00,00')
    })
    // 1.13 is critical float number. If we calculate the cent wrong it will fail
    // 1.13 * 100 is 112.99999999999999
    // !This is not a guarantee that the conversion is correct!
    it('@update:cents - emits 113 on user input 1,13 €', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '3' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents').at(-1)).toStrictEqual([113])
      expect(wrapper.find('input').element.value).toBe('01,13')
    })
    // 1.13 is critical float number. If we calculate the cent wrong it will fail
    // 1.13 * 100 is 112.99999999999999
    // !This is not a guarantee that the conversion is correct!
    it('@update:cents - emits 112 on user input 1,12 €', async () => {
      const input = wrapper.find('input')
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '1' })
      await input.trigger('input', { data: '2' })
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:cents')
      expect(wrapper.emitted('update:cents').at(-1)).toStrictEqual([112])
      expect(wrapper.find('input').element.value).toBe('01,12')
    })
  })
})
