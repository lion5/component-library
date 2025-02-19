import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import SlugInput from './SlugInputValidated.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'

describe('SlugInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(SlugInput, {
      props: {
        name: 'name',
        label: 'label',
        prefix: 'prefix'
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
    it(':error - is applied to ErrorMessage', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })
      wrapper.find('input').trigger('blur')
      await flushPromises()

      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
    it(':slug - is applied to input', async () => {
      await wrapper.setProps({ slug: 'This Is not a good slug @ or not' })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('this-is-not-a-good-slug-or-not')
    })
  })
  describe('@events', () => {
    it('@update:slug - does emit cleaned input', async () => {
      const input = wrapper.find('input')
      input.setValue('This Is not a good slug @ or not')
      await flushPromises()

      expect(wrapper.emitted()).toHaveProperty('update:slug')
      expect(wrapper.emitted('update:slug')).toHaveLength(1)
      expect(wrapper.emitted('update:slug').at(0)).toStrictEqual(['this-is-not-a-good-slug-or-not'])
      expect(wrapper.find('input').element.value).toBe('this-is-not-a-good-slug-or-not')
    })
  })
})
