import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import CardBadgeSuccess from '@core/components/cards/CardBadgeSuccess/CardBadgeSuccess.vue'
import BaseTooltip from '@core/components/utils/BaseTooltip/BaseTooltip.vue'

describe('CardBadgeSuccess.spec.ts', () => {
  let wrapper: VueWrapper<ReturnType<typeof defineComponent>>

  beforeEach(() => {
    wrapper = mount(CardBadgeSuccess, {
      props: {
        tooltipText: 'Test'
      }
    })
  })
  describe(':props', () => {
    it('tooltipText - is applied to BaseTooltip', async () => {
      const tooltipText = 'Test'
      await wrapper.setProps({ tooltipText })

      expect(wrapper.findComponent(BaseTooltip).props().tooltipText).toBe(tooltipText)
    })
  })
})
