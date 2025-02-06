import BasePill from './BasePill.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import BasePillContent from '@core/components/display/BasePill/BasePillContent.vue'
import TooltipIcon from '@core/components/utils/TooltipIcon/TooltipIcon.vue'

describe('BasePill.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(BasePill, {
      props: {
        label: 'Test Pill'
      }
    })
  })
  describe(':props', () => {
    it(':label,:iconStartCls,:busy - are passed to BasePillContent', async () => {
      const expectedLabel = 'Test Pill'
      const expectedIconCls = 'bi-person-fill'
      await wrapper.setProps({ busy: true, label: expectedLabel, iconStartCls: expectedIconCls })

      expect(wrapper.findComponent(BasePillContent).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(BasePillContent).props().iconStartCls).toBe(expectedIconCls)
      expect(wrapper.findComponent(BasePillContent).props().busy).toBeTruthy()
    })
    it(':tooltipText - Tooltip not rendered if not set', async () => {
      await wrapper.setProps({ tooltipText: undefined })

      expect(wrapper.findComponent(TooltipIcon).exists()).toBeFalsy()
    })
    it(':tooltipText - Tooltip is rendered if set', async () => {
      await wrapper.setProps({ tooltipText: 'Some text' })

      expect(wrapper.findComponent(TooltipIcon).exists()).toBeTruthy()
    })
    it(':tooltipText,:tooltipShowOnHover - are passed to TooltipIcon', async () => {
      const expectedTooltipText = 'Some text'
      await wrapper.setProps({ tooltipText: expectedTooltipText, tooltipShowOnHover: false })

      expect(wrapper.findComponent(TooltipIcon).props().tooltipText).toBe(expectedTooltipText)
      expect(wrapper.findComponent(TooltipIcon).props().showOnHover).toBe(false)
    })
  })
})
