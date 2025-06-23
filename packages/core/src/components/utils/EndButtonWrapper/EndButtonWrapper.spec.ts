import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import EndButtonWrapper from '@core/components/utils/EndButtonWrapper/EndButtonWrapper.vue'

describe('EndButtonWrapper.vue', () => {
  let wrapper: ReturnType<typeof mount>

  beforeEach(() => {
    wrapper = mount(EndButtonWrapper, {
      props: {
        label: 'Test Button',
        iconClass: 'icon-class'
      }
    })
  })
  describe(':props', () => {
    it(':iconClass - is set as icon', async () => {
      await wrapper.setProps({ iconClass: 'test-icon-class' })

      expect(wrapper.find('i').classes('test-icon-class')).toBeDefined()
    })
  })
  describe('@events', () => {
    it('@click - emits click event', async () => {
      await wrapper.find('button').trigger('click')

      expect(wrapper.emitted()).toHaveProperty('btn-click')
    })
  })
})
