import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'

describe('CardDismissButton', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(CardDismissButton)
  })
  describe('@events', () => {
    it('dismiss - is triggered on button click', async () => {
      const button = wrapper.find('button')
      await button.trigger('click')

      expect(wrapper.emitted('dismiss').length).toBe(1)
    })
  })
})
