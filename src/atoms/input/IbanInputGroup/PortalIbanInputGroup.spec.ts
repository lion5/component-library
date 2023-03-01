import { createLocalVue, mount } from '@vue/test-utils'
import type { Wrapper } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import PortalIbanInputGroup from '@/base/components/input/IbanInputGroup/PortalIbanInputGroup.vue'
import type Vue from 'vue'
import { BootstrapVue } from 'bootstrap-vue'
import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'

const localVue = createLocalVue()
localVue.use(BootstrapVue)

describe('PortalIbanInputGroup', () => {
  let wrapper: Wrapper<Vue>

  beforeEach(() => {
    wrapper = mount(PortalIbanInputGroup, {
      localVue,
      propsData: {
        id: 'iban-input'
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })

  describe(':props', () => {
    it(':uppercase - is set to true for the underlying input group', async () => {
      const inputGroup = await wrapper.find(PortalInputGroup)

      expect(inputGroup.props().upperCase).toBe(true)
    })
  })

})
