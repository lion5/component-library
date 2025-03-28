import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '@core/components/modals/BaseModal/BaseModal.vue'
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'

describe('DismissibleModal', () => {
  let wrapper

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    wrapper = mount(DismissibleModal,
      {
        props: {
          modalDisplayed: true
        }
      })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(':props', () => {
    it(':modalDisplayed - v-model is passed down correctly if modalDisplayed set to true', async () => {
      await wrapper.setProps({ modalDisplayed: true })
      const baseModal = wrapper.findComponent(BaseModal)

      expect(baseModal.vm.modalDisplayed).toBe(true)
    })
    it(':modalDisplayed - v-model is passed down correctly if modalDisplayed set to false', async () => {
      await wrapper.setProps({ modalDisplayed: false })
      const baseModal = wrapper.findComponent(BaseModal)
      expect(baseModal.vm.$props.modalDisplayed).toBe(false)
    })
  })

  describe('@events', () => {
    it('@update:modalDisplayed(BaseModal) - triggers @update:modalDisplayed with value true', async () => {
      const baseModal = await wrapper.findComponent(BaseModal)
      await baseModal.vm.emit('update:modalDisplayed', true)

      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([true])
    })
    it('@dismiss - triggers @update:modalDisplayed with value false', async () => {
      const cardDismissButton = await wrapper.findComponent(CardDismissButton)
      await cardDismissButton.vm.$emit('dismiss')

      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([false])
    })
  })

  describe('#slots', () => {
    it('#default - trigger @update:modalDisplayed(true) when using open function', async () => {
      let openModal
      const wrapper = mount(DismissibleModal, {
        slots: {
          default: (params) => {
            openModal = params.openModal
            return ''
          }
        },
        props: {
          modalDisplayed: true
        }
      })
      await openModal()
      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([true])
    })
    it('#default - trigger @update:modalDisplayed(false) when using close function', async () => {
      let closeModal
      const wrapper = mount(DismissibleModal, {
        slots: {
          default: (params) => {
            closeModal = params.closeModal
            return ''
          }
        },
        props: {
          modalDisplayed: true
        }
      })
      await closeModal()
      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([false])
    })
  })
})
