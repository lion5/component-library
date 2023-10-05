import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import WidgetHeadline from '@gridstack/atoms/dashboard/WidgetHeadline/WidgetHeadline.vue'

describe('WidgetHeadline', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(WidgetHeadline)
  })

  describe(':props', () => {
    it(':headline - is displayed as a h2', async () => {
      const expectedHeadline = 'This is a test Headline'
      await wrapper.setProps({
        headline: expectedHeadline
      })
      expect(wrapper.find('h2').text()).toBe(expectedHeadline)
      expect(wrapper.find('small').exists()).toBeFalsy()
    })
    it(':subheading - is displayed as a small', async () => {
      const expectedSubheading = 'This is an expected subheading'
      await wrapper.setProps({
        headline: 'Example Headline',
        subheading: expectedSubheading
      })
      expect(wrapper.find('small').text()).toBe(expectedSubheading)
    })
  })
})
