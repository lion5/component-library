import { beforeEach, describe, it, expect } from 'vitest'
import type { defineComponent } from 'vue'
import { mount } from '@vue/test-utils'
import { BaseInputWrapper } from '@core/components'

describe('CodeInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(BaseInputWrapper)
  })
  describe(':props', () => {
    it(':showPlaceholder - class hide-placeholder is set per default', async () => {
      expect(wrapper.classes()).toContain('hide-placeholder')
    })
    it(':showPlaceholder - adds class hide-placeholder if set to false', async () => {
      await wrapper.setProps({ showPlaceholder: false })
      expect(wrapper.classes()).toContain('hide-placeholder')
    })
    it(':showPlaceholder - class hide-placeholder is not set if set to true', async () => {
      await wrapper.setProps({ showPlaceholder: true })
      expect(wrapper.classes()).not.toContain('hide-placeholder')
    })

    it(':showError - IconError can be displayed as default', async () => {
      expect(wrapper.find('.error-icon').exists()).toBeTruthy()
    })
    it(':showError - IconError can be displayed if set to true', async () => {
      await wrapper.setProps({ showErrorIcon: true })
      expect(wrapper.find('.error-icon').exists()).toBeTruthy()
    })
    it(':showError - IconError can be displayed if set to false', async () => {
      await wrapper.setProps({ showErrorIcon: false })
      expect(wrapper.find('.error-icon').exists()).toBeFalsy()
    })
  })
})
