import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDownItem from '@core/components/dropdown/DropDownItem/DropDownItem.vue'

describe('DropDownItem.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    wrapper = shallowMount(DropDownItem, {
      props: {
        label: 'defaultTestLabel'
      },
      slots: {
        icon: '<span class="icon-slot">Icon</span>',
        'busy-icon': '<span class="busy-icon-slot">Busy Icon</span>'
      }
    })
  })
  describe(':props', () => {
    it(':label - is displayed', async () => {
      const expectedLabel = 'testLabel'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('button').text()).toContain(expectedLabel)
    })

    it(':busy - displays icon slot by default (when busy is false)', async () => {
      expect(wrapper.find('.icon-slot').exists()).toBe(true)
      expect(wrapper.find('.busy-icon-slot').exists()).toBe(false)
    })

    it(':busy - displays busy-icon slot when busy is true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.find('.icon-slot').exists()).toBe(false)
      expect(wrapper.find('.busy-icon-slot').exists()).toBe(true)
    })

    it(':busy - disable button if busy true', async () => {
      await wrapper.setProps({ busy: true })
      expect(wrapper.find('button').attributes('disabled')).toBeDefined()
    })

    it(':busy - enable button if busy false', async () => {
      await wrapper.setProps({ busy: false })
      expect(wrapper.find('button').attributes('disabled')).toBeUndefined()
    })
  })
})
