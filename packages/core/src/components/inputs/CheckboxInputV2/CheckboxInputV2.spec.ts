import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { Wrapper } from '@vue/test-utils'
import { createLocalVue, mount } from '@vue/test-utils'
import Vue from 'vue'
import CheckboxInput from '@/base/component-library/components/atoms/CheckboxInput/CheckboxInput.vue'

const localVue = createLocalVue()

describe('CheckboxInput', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(CheckboxInput, {
      localVue,
      propsData: {
        id: 'checkbox-input',
        label: 'checkbox'
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe(':props', () => {
    it(':value - is propagated to input element', async () => {
      await wrapper.setProps({ value: true })

      const inputEl = wrapper.find('#checkbox-input')

      expect((inputEl.element as HTMLInputElement).checked).toBe(true)
    })
  })

  describe('@events', () => {
    it(':input - is triggered if checkbox is checked', async () => {
      const inputEl = wrapper.find('#checkbox-input')

      await inputEl.setChecked(true)

      expect(wrapper.emitted('input')?.at(0)).toEqual([true])
    })
    it(':input - is triggered if checkbox is unchecked', async () => {
      await wrapper.setProps({ value: true })
      const inputEl = wrapper.find('#checkbox-input')

      await inputEl.setChecked(false)

      expect(wrapper.emitted('input')?.at(0)).toEqual([false])
    })
  })

})
