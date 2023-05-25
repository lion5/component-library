import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import IFrameWidget from '@/dashboard/widgets/IFrameWidget/IFrameWidget.vue'
import { IFRAME_WIDGET_WRAPPER } from '@/atoms'
import { IFrameSetting } from '@/atoms/dashboard/widgets/IFrameWidget/settings'

describe('IFrameWidget.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(IFrameWidget, {
      props: {
        settings: new Map(),
        defaultSettings: IFRAME_WIDGET_WRAPPER.defaultSettings
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })
  describe(':props', () => {
    it(':settings - src is applied to iframe', async () => {
      const expectedSrc = 'https://example.com'

      const settings = new Map([[IFrameSetting.SRC, expectedSrc]])

      await wrapper.setProps({ settings })

      expect(wrapper.find('iframe').attributes('src')).toBe(expectedSrc)
    })
  })
})
