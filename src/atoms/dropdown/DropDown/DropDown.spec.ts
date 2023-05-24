import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDown from '@/dashboard/components/DropDown.vue'

describe('DropDown.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(DropDown, {
      attachTo: 'body',
    })
  })
  describe('<template>', () => {
    it('dropdown hidden on mounted', async () => {
      expect(wrapper.find('.dropdown-content').isVisible()).toBeFalsy()
    })
  })
  describe('@events', () => {
    it('@click(IconButton) - displays dropdown', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.find('.dropdown-content').isVisible()).toBeTruthy()
    })
    it('@click(IconButton) - click outside to close dropdown again', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')
      await button.element.blur()

      expect(wrapper.find('.dropdown-content').isVisible()).toBeFalsy()
    })
  })
})
