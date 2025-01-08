import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import CheckboxInputV2 from '@core/components/inputs/CheckboxInputV2Validated/CheckboxInputV2Validated.vue'

describe('CheckboxInput', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(CheckboxInputV2, {
      props: {
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
      expect(wrapper.find('label .small-label').exists()).toBeFalsy()
    })

    it(':small - is rendered as small label', async () => {
      const expectedSmallLabel = 'Expected Small Label'
      await wrapper.setProps({ labelSmall: expectedSmallLabel })
      expect(wrapper.find('label .main-label').exists()).toBeTruthy()
      expect(wrapper.find('label .small-label').text()).toBe(expectedSmallLabel)
    })

    it(':modelValue - is applied to input', async () => {
      await wrapper.setProps({ modelValue: true })
      await flushPromises()
      expect(wrapper.find('input').element.value).toBe('true')
      expect(wrapper.find('input').element.checked).toBe(true)
    })
  })

  describe('@events', () => {
    it(':update:modelValue - is triggered if checkbox is checked', async () => {
      const inputEl = wrapper.find('input')

      await inputEl.setChecked(true)

      expect(wrapper.emitted('update:modelValue')?.at(0)).toEqual([true])
    })
    it(':update:modelValue - is triggered if checkbox is unchecked', async () => {
      await wrapper.setProps({ modelValue: true })
      const inputEl = wrapper.find('input')

      await inputEl.setChecked(false)

      await flushPromises()
      console.log(wrapper.emitted('update:modelValue'))

      expect(wrapper.emitted('update:modelValue')?.at(0)).toEqual([undefined])
    })
  })

})
