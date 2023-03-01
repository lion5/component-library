import { createLocalVue, mount } from '@vue/test-utils'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'
import '@/configuration/validation'
import flushPromises from 'flush-promises'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()

// install plugins as normal
localVue.use(BootstrapVue)
localVue.use(IconsPlugin)

describe('PortalInputGroup', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(PortalInputGroup, {
      propsData: {
        id: 'test-portal-input-group',
        label: 'Input',
        validationRules: 'required'
      },
      localVue
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe(':props', () => {
    it(':validationRules - required field shows no error with empty value and focus in field', async () => {
      const input = wrapper.find('input')
      input.setValue('')
      await flushPromises() // run validation

      const errorEl = wrapper.find('.input-message-wrapper > .error')
      expect(errorEl.exists()).toBeFalsy()
    })

    it(':validationRules - required field shows required error with empty value and blur event (focus left the field)', async () => {
      const input = wrapper.find('input')
      input.setValue('')
      input.trigger('blur')
      await flushPromises()

      const errorEl = wrapper.find('.input-message-wrapper > .error')
      expect(errorEl.text()).toContain('Pflichtfeld')
    })

    it(':validationRules - required field shows required error with empty value and change event (focus left the field)', async () => {
      const input = wrapper.find('input')
      input.setValue('')
      input.trigger('change')
      await flushPromises()

      const errorEl = wrapper.find('.input-message-wrapper > .error')
      expect(errorEl.text()).toContain('Pflichtfeld')
    })

    it(':uppercase - emits value as uppercase letters if set to true', async () => {
      wrapper = mount(PortalInputGroup, {
        propsData: {
          id: 'test-portal-input-group',
          upperCase: true
        },
        localVue
      })
      const input = wrapper.find('input#test-portal-input-group')
      await input.setValue('de12')

      expect(wrapper.emitted().input.length).toBe(1)
      expect(wrapper.emitted().input[0]).toStrictEqual(['DE12'])
    })
  })
})
