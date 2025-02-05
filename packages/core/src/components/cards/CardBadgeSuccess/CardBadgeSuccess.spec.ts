import { mount, type VueWrapper } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import { defineComponent } from 'vue'
import { TooltipIcon } from '@core/components'
import CardBadgeSuccess from '@core/components/cards/CardBadgeSuccess/CardBadgeSuccess.vue'

describe('CardBadgeSuccess.spec.ts', () => {
  let wrapper: VueWrapper<ReturnType<typeof defineComponent>>

  beforeEach(() => {
    wrapper = mount(CardBadgeSuccess, {
      props: {
        tooltipText: 'Test'
      },
    })
  })
  describe(':props', () => {
    it('tooltipText - is applied to TooltipIcon', async () => {
      const tooltipText = 'Test'
      await wrapper.setProps({ tooltipText })

      expect(wrapper.findComponent(TooltipIcon).props().tooltipText).toBe(tooltipText)
    })
  })
})
