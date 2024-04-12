import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import { defineRule } from 'vee-validate'
import BaseInput from '@core/components/inputs/BaseInput/BaseInput.vue'

describe('BaseInput', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return mount(BaseInput, {
      attachTo: document.body,
      props: {
        name: 'base-input',
        label: 'BaseInput',
        validationRules: 'required'
      }
    })
  }

  beforeEach(() => {
    // mock required validation rule
    defineRule('required', () => 'error message')
    wrapper = mountComponent()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    describe(':name', () => {
      it('is rendered as input name and id', () => {
        const input = wrapper.find('input')

        expect(input.element.name).toBe('base-input')
        expect(input.element.id).toBe('base-input')
      })
    })
    describe(':modelValue', () => {
      it('propagates initial value down to HTML input', () => {
        const input = wrapper.find('input')

        expect(input.element.value).toBe('')
      })
      it.skip('propagates value changes down to HTML input', async () => {
        const input = wrapper.find('input')

        expect(input.element.value).toBe('')

        await wrapper.setProps({ modelValue: 'test123' })

        expect(input.element.value).toBe('test123')
      })
    })
    describe.skip(':validationRules', () => {
      it('adds failed class if validation fails', async () => {
        await wrapper.setProps({ modelValue: '' })

        await flushPromises()
        const input = wrapper.find('input')
        expect(input.classes()).toContain('failed')
      })
      it('shows error message if validation fails', async () => {
        await wrapper.setProps({ modelValue: '' })

        await flushPromises()
        const errorMessage = wrapper.find('span.error')
        expect(errorMessage.isVisible()).toBe(true)
      })
    })
  })

  describe('@events', () => {
    describe('@update:modelValue', () => {
      it('emits updated input value', () => {
        const input = wrapper.find('input')

        input.setValue('new value')

        expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
        expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([
          'new value'
        ])
      })
    })
  })
})
