import BasePill from './BasePill.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import BasePillContent from '@core/components/display/BasePill/BasePillContent.vue'
import BaseTooltip from '@core/components/utils/BaseTooltip/BaseTooltip.vue'

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

      expect(wrapper.findComponent(BaseTooltip).exists()).toBeFalsy()
    })
    it(':tooltipText - Tooltip is rendered if set', async () => {
      await wrapper.setProps({ tooltipText: 'Some text' })

      expect(wrapper.findComponent(BaseTooltip).exists()).toBeTruthy()
    })
    it(':tooltipText,:tooltipShowOnHover - are passed to BaseTooltip', async () => {
      const expectedTooltipText = 'Some text'
      await wrapper.setProps({ tooltipText: expectedTooltipText, tooltipShowOnHover: false })

      expect(wrapper.findComponent(BaseTooltip).props().tooltipText).toBe(expectedTooltipText)
      expect(wrapper.findComponent(BaseTooltip).props().showOnHover).toBe(false)
    })
  })
})
