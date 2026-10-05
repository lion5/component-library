import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDown from '@core/components/navigation/DropDown/DropDown.vue'
import DropDownItem from '@core/components/navigation/DropDownItem/DropDownItem.vue'

describe('DropDown.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  const input = document.createElement('input')

  beforeEach(() => {
    wrapper = mount(DropDown, {
      attachTo: document.body
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

    it('@click(item) - closes dropdown even when the item click has no side effect that removes focus', async () => {
      const itemWrapper = mount(DropDown, {
        attachTo: document.body,
        global: {
          components: { DropDownItem }
        },
        slots: {
          dropDownContent: '<DropDownItem label="Item" />'
        }
      })

      const button = itemWrapper.find('button.trigger')
      await button.trigger('click')
      expect(itemWrapper.find('.dropdown-content').isVisible()).toBeTruthy()

      // Clicking the item should still close the dropdown.
      const item = itemWrapper.find('.drop-down-item')
      await item.trigger('click')

      expect(itemWrapper.find('.dropdown-content').isVisible()).toBeFalsy()

      itemWrapper.unmount()
    })
  })
})
