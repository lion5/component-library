import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import AddressInput from './AddressInputValidated.vue'
import { Address } from '@core/models'

describe('AddressInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(AddressInput, {
      props: {
        name: 'name'
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to Field', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })
      const inputs = wrapper.findAll('input')
      expect(inputs.at(0).attributes('name')).toBe(`${expectedName}.street`)
      expect(inputs.at(1).attributes('name')).toBe(`${expectedName}.postalCode`)
      expect(inputs.at(2).attributes('name')).toBe(`${expectedName}.city`)
    })

    it(':address - is applied to Field', async () => {
      const expectedAddress = new Address('Test Street 1', '96052', 'Test City')
      await wrapper.setProps({ address: expectedAddress })

      const inputs = wrapper.findAll('input')
      expect(inputs.at(0).element.value).toBe(expectedAddress.street)
      expect(inputs.at(1).element.value).toBe(expectedAddress.postalCode)
      expect(inputs.at(2).element.value).toBe(expectedAddress.city)
    })
  })
})
