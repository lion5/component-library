import { mount } from '@vue/test-utils'
import CardDismissButton from '@/base/components/card/CardDismissButton/CardDismissButton.vue'
import { beforeEach, afterEach, describe, expect, it } from 'vitest'


describe('CardDismissButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(CardDismissButton)
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe('@events', () => {
    it('dismiss - is triggered on button click', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('dismiss').length).toBe(1)
    })
  })
})
