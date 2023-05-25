import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDownItem from '@/dashboard/components/DropDownItem.vue'

describe('DropDownItem.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    wrapper = mount(DropDownItem, { props: { label: 'defaultTestLabel' } })
  })
  describe(':props', () => {
    it(':label - is displayed', async () => {
      const expectedLabel = 'testLabel'
      await wrapper.setProps({ label: expectedLabel })
      expect(wrapper.find('button').text()).toBe(expectedLabel)
    })
  })
})
