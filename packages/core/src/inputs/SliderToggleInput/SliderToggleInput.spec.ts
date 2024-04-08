import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import SliderToggleInput from '@core/inputs/SliderToggleInput/SliderToggleInput.vue'

describe('SliderToggleInput', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return mount(SliderToggleInput, {
      attachTo: document.body,
      props: {
        name: 'toggle',
        label: 'SliderToggle'
      }
    })
  }

  beforeEach(() => {
    wrapper = mountComponent()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    describe(':name', () => {
      it('is rendered as input name and id', () => {
        const input = wrapper.find('input')

        expect(input.element.name).toBe('toggle')
        expect(input.element.id).toBe('toggle')
      })
    })
    describe(':modelValue', () => {
      it('propagates initial value down to HTML input', () => {
        const input = wrapper.find('input')

        expect(input.element.value).toBe('false')
      })
      it('propagates value changes down to HTML input', async () => {
        const input = wrapper.find('input')

        await wrapper.setProps({ modelValue: true })

        expect(input.element.value).toBe('true')
      })
    })
  })
  describe('@update:modelValue', () => {
    it('emits updated input value', () => {
      const input = wrapper.find('input')

      input.setValue(true)

      expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
      expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([true])

      input.setValue(false)

      expect(wrapper.emitted('update:modelValue')?.length).toBe(2)
      expect(wrapper.emitted('update:modelValue')?.at(1)).toStrictEqual([false])
    })
  })
})
