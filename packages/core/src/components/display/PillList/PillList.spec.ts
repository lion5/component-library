import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import PillList from '@core/components/display/PillList/PillList.vue'
import { Pill } from '@core/components/display/PillList/pill'
import BasePill from '@core/components/display/BasePill/BasePill.vue'

describe('PillList.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(PillList, {
      props: {
        pills: []
      }
    })
  })
  describe(':props', () => {
    it(':pills - rendered as pills', async () => {
      const pills = [
        new Pill(1, 'Pill'),
        new Pill(2, 'Person Pill', 'bi-person-fill'),
        new Pill('3', 'Cash Pill', 'bi-cash', true, 'This is a tooltip', true)
      ]
      await wrapper.setProps({ pills })

      const pillComponents = wrapper.findAllComponents(BasePill)
      expect(pillComponents).toHaveLength(3)
      expect(pillComponents[0].props()).toEqual({ label: pills[0].label, iconStartCls: undefined, busy: false, tooltipText: undefined, tooltipShowOnHover: true })
      expect(pillComponents[1].props()).toEqual({ label: pills[1].label, iconStartCls: 'bi-person-fill', busy: false, tooltipText: undefined, tooltipShowOnHover: true })
      expect(pillComponents[2].props()).toEqual({ label: pills[2].label, iconStartCls: 'bi-cash', busy: true, tooltipText: 'This is a tooltip', tooltipShowOnHover: true })
    })
  })
})
