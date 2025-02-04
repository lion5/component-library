import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import BaseInputV3Validated from './BaseInputV3Validated.vue'
import { BaseInputV3 } from '@core/components'

describe('BaseInputV3Validated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(BaseInputV3Validated, {
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
      const expectedType = 'email'

      await wrapper.setProps({ name: expectedName, label: expectedLabel, type: expectedType, showErrorIcon: true })

      expect(wrapper.findComponent(BaseInputV3).props().name).toBe(expectedName)
      expect(wrapper.findComponent(BaseInputV3).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(BaseInputV3).props().type).toBe(expectedType)
      expect(wrapper.findComponent(BaseInputV3).props().showErrorIcon).toBe(true)
    })
  })

  describe('@events', () => {
    it('@update:modelValue - emits updated input value', async () => {
      const expectedValue = 'Expected Value'
      const input = wrapper.findComponent(BaseInputV3)
      input.vm.$emit('update:modelValue', expectedValue)
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
      expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([
        expectedValue
      ])
    })
  })
})
