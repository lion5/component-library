import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import CodeInput from '@core/components/inputs/CodeInput/CodeInput.vue'
import CodePartTextInput from '@core/components/inputs/CodeInput/CodePartTextInput.vue'

describe('CodeInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(CodeInput, {
      props: {
        name: 'name'
      }
    })
  })
  describe(':props', () => {
    it(':code - is applied to inputgroup', async () => {
      await wrapper.setProps({ code: '1234ABCD' })
      await flushPromises()
      //check the two input fields if the code is applied
      expect(wrapper.findAll('input').at(0).element.value).toBe('1234')
      expect(wrapper.findAll('input').at(1).element.value).toBe('ABCD')
    })
    it(':partLength - is applied to inputgroup', async () => {
      await wrapper.setProps({ partLength: 4 })
      await flushPromises()
      //check the two input fields if the partLength is applied
      expect(wrapper.findAll('input').at(0).attributes('maxlength')).toBe('4')
      expect(wrapper.findAll('input').at(1).attributes('maxlength')).toBe('4')
    })
  })

  describe('@events', () => {
    it('@update:code - emit 1234 if user types 1234', async () => {
      wrapper.findComponent(CodePartTextInput).vm.$emit('update:inputCode', '1')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '12')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '123')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '1234')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:code')
      expect(wrapper.emitted('update:code')).toHaveLength(4)
      expect(wrapper.emitted('update:code').at(0)).toStrictEqual(['1'])
      expect(wrapper.emitted('update:code').at(1)).toStrictEqual(['12'])
      expect(wrapper.emitted('update:code').at(2)).toStrictEqual(['123'])
      expect(wrapper.emitted('update:code').at(3)).toStrictEqual(['1234'])
      expect(wrapper.find('input').element.value).toBe('1234')
    })
    it('@update:code - emit 1234ABCD if user types 1234ABCD', async () => {
      wrapper.findComponent(CodePartTextInput).vm.$emit('update:inputCode', '1')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '12')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '123')
      await flushPromises()

      wrapper
        .findComponent(CodePartTextInput)
        .vm.$emit('update:inputCode', '1234')
      await flushPromises()

      wrapper
        .findAllComponents(CodePartTextInput)
        .at(1)
        .vm.$emit('update:inputCode', 'A')
      await flushPromises()

      wrapper
        .findAllComponents(CodePartTextInput)
        .at(1)
        .vm.$emit('update:inputCode', 'AB')
      await flushPromises()

      wrapper
        .findAllComponents(CodePartTextInput)
        .at(1)
        .vm.$emit('update:inputCode', 'ABC')
      await flushPromises()

      wrapper
        .findAllComponents(CodePartTextInput)
        .at(1)
        .vm.$emit('update:inputCode', 'ABCD')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:code')
      expect(wrapper.emitted('update:code')).toHaveLength(8)
      expect(wrapper.emitted('update:code').at(0)).toStrictEqual(['1'])
      expect(wrapper.emitted('update:code').at(1)).toStrictEqual(['12'])
      expect(wrapper.emitted('update:code').at(2)).toStrictEqual(['123'])
      expect(wrapper.emitted('update:code').at(3)).toStrictEqual(['1234'])
      expect(wrapper.emitted('update:code').at(4)).toStrictEqual(['1234A'])
      expect(wrapper.emitted('update:code').at(5)).toStrictEqual(['1234AB'])
      expect(wrapper.emitted('update:code').at(6)).toStrictEqual(['1234ABC'])
      expect(wrapper.emitted('update:code').at(7)).toStrictEqual(['1234ABCD'])
    })
  })
})
