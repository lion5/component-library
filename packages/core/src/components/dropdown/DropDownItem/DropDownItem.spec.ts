import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import DropDownItem from '@core/components/dropdown/DropDownItem/DropDownItem.vue'

describe('DropDownItem.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
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
