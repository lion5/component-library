import { beforeEach, describe, expect, it } from 'vitest'
import { flushPromises, shallowMount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import { nextTick } from 'vue'
import AddressInput from './AddressInputValidated.vue'
import { Address } from '@core/models'
import { BaseInputV3Validated } from '@core/components'

describe('AddressInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(AddressInput, {
      props: {
        name: 'name',
        modelValue: new Address('', '', ''),
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to Field', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      const inputs = wrapper.findAllComponents(BaseInputV3Validated)
      expect(inputs.at(0).props('name')).toBe(`${expectedName}.street`)
      expect(inputs.at(1).props('name')).toBe(`${expectedName}.postalCode`)
      expect(inputs.at(2).props('name')).toBe(`${expectedName}.city`)
    })

    it(':modelValue - is applied to Field', async () => {
      const expectedAddress = new Address('Test Street 1', '96052', 'Test City')
      await wrapper.setProps({ modelValue: expectedAddress })

      const inputs = wrapper.findAllComponents(BaseInputV3Validated)
      expect(inputs.at(0).props('modelValue')).toBe(expectedAddress.street)
      expect(inputs.at(1).props('modelValue')).toBe(expectedAddress.postalCode)
      expect(inputs.at(2).props('modelValue')).toBe(expectedAddress.city)
    })
  })

  describe('@events', () => {
    it('@update:address - emits updated input value', async () => {
      const expectedValue = new Address('Test Street 1', '96052', 'Test City')
      const inputs = wrapper.findAllComponents(BaseInputV3Validated)
      inputs.at(0).vm.$emit('update:modelValue', expectedValue.street)
      inputs.at(1).vm.$emit('update:modelValue', expectedValue.postalCode)
      inputs.at(2).vm.$emit('update:modelValue', expectedValue.city)
      await nextTick()
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')?.length).toBe(3)
      expect(wrapper.emitted('update:modelValue')?.at(-1)).toStrictEqual([
        expectedValue
      ])
    })
    it('@input-finished - emits after input is completed', async () => {
      const inputs = wrapper.findAllComponents(BaseInputV3Validated)
      inputs.at(0).vm.$emit('update:modelValue', 'Test Street 1')
      inputs.at(0).vm.$emit('blur', new FocusEvent('blur'))
      inputs.at(1).vm.$emit('update:modelValue', '96052')
      inputs.at(1).vm.$emit('blur', new FocusEvent('blur'))
      inputs.at(2).vm.$emit('update:modelValue', 'Test City')
      inputs.at(2).vm.$emit('blur', new FocusEvent('blur'))
      await nextTick()

      expect(wrapper.emitted('input-finished')?.length).toBe(1)
    })
    it('@input-finished - not emitted if one input is empty', async () => {
      const inputs = wrapper.findAllComponents(BaseInputV3Validated)
      inputs.at(0).vm.$emit('update:modelValue', 'Test Street 1')
      inputs.at(0).vm.$emit('blur', new FocusEvent('blur'))
      inputs.at(1).vm.$emit('update:modelValue', '96052')
      inputs.at(1).vm.$emit('blur', new FocusEvent('blur'))
      await nextTick()

      expect(wrapper.emitted('input-finished')).toBeUndefined()
    })
  })
})
