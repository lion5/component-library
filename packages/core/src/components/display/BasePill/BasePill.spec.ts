import BasePill from './BasePill.vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import ArrowRotateLoadingAnimation from '@core/components/icons/ArrowRotateLoadingAnimation.vue'
import { BaseIcon } from '@core/components'
import { defineComponent } from 'vue'

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
    it(':busy - renders animation if true', async () => {
      await wrapper.setProps({ busy: true })

      expect(wrapper.findComponent(ArrowRotateLoadingAnimation).exists()).toBeTruthy()
    })
    it(':iconStartCls - rendered if set and not busy', async () => {
      const expectedIconCls = 'bi-person-fill'
      await wrapper.setProps({ iconStartCls: expectedIconCls })

      expect(wrapper.findComponent(BaseIcon).props().icon).toBe(expectedIconCls)
    })
    it(':iconStartCls - icon hidden if set and busy is set', async () => {
      await wrapper.setProps({ iconStartCls: 'bi-person-fill', busy: true })

      expect(wrapper.findComponent(BaseIcon).exists()).toBeFalsy()
    })
  })
})
