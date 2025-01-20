import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import TextareaInput from '@core/components/inputs/TextareaInput/TextareaInput.vue'

describe('TextareaInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(TextareaInput, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name, :label, :type, :showErrorIcon - are applied to BaseInputV3', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedMaxlength = '1234'

      await wrapper.setProps({ name: expectedName, label: expectedLabel, maxlength: expectedMaxlength })

      expect(wrapper.findComponent(TextareaInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(TextareaInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(TextareaInput).props().maxlength).toBe(expectedMaxlength)
    })
  })

  describe('@events', () => {
    describe('@update:modelValue', () => {
      it('emits updated input value', async () => {
        const expectedValue = 'Expected Value'
        const input = wrapper.findComponent(TextareaInput)
        input.vm.$emit('update:modelValue', expectedValue)
        await nextTick()

        expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
        expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([
          expectedValue
        ])
      })
    })
  })
})
