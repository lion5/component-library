import { beforeEach, describe, expect, it } from 'vitest'
import { DOMWrapper, mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import NumberInputValidated from './NumberInputValidated.vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'

describe('NumberInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(NumberInputValidated, {
      props: {
        name: 'name',
        label: 'label',
        modelValue: 0
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to input', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
      expect(wrapper.find('input').attributes('id')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':type - type is text', async () => {
      expect(wrapper.find('input').attributes('type')).toBe('text')
    })
  })
  describe('vee-validate', () => {
    it('@update:modelValue - returns 123 if BaseInputV3 emit "123" string', async () => {
      await triggerInput(wrapper.getComponent(BaseInputV3).get('input'), '123', 3)

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([123])
    })
    it('@update:modelValue - returns undefined if BaseInputV3 emit empty string', async () => {
      await triggerInput(wrapper.getComponent(BaseInputV3).get('input'), '', 0)

      expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
      expect(wrapper.emitted('update:modelValue').at(-1)).toEqual([undefined])
    })

    async function triggerInput(
      input: DOMWrapper<HTMLInputElement>,
      value: string,
      cursorPosition: number
    ) {
      const el = input.element as HTMLInputElement
      el.value = value
      el.setSelectionRange(cursorPosition, cursorPosition)
      await input.trigger('input')
      await new Promise(requestAnimationFrame)
    }
  })
})
