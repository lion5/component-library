import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDown from '@core/components/dropdown/DropDown/DropDown.vue'

describe('DropDown.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  const input = document.createElement('input')

  beforeEach(() => {
    wrapper = mount(DropDown, {
      attachTo: document.body,
    })

    document.body.appendChild(input)
    input.focus()
  })

  afterEach(() => {
    wrapper.unmount()
    document.body.removeChild(input)
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
