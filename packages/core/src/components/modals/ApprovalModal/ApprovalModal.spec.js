import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import ApprovalModal from '@core/components/modals/ApprovalModal/ApprovalModal.vue'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'

describe('ApprovalModal', () => {
  let wrapper

  beforeAll(() => {
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    wrapper = mount(ApprovalModal, {
      props: {
        title: 'Title',
        buttonLabel: 'ButtonLabel'
      }
    })
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  describe(':props', () => {
    it(':title - is rendered correctly', () => {
      expect(wrapper.find('h2').text()).toBe('Title')
    })

    it(':buttonLabel - is rendered correctly in a BaseButton', () => {
      const button = wrapper.findComponent(BaseButton).find('button')

      expect(button.text()).toBe('ButtonLabel')
    })
  })

  describe('@events', () => {
    it('@accept - emitted when approval button is clicked', async () => {
      const approvalButton = await wrapper.findComponent(BaseButton).find('button')
      await approvalButton.trigger('click')

      expect(wrapper.emitted('accept').length).toBe(1)
      expect(wrapper.emitted('accept')[0]).toStrictEqual([])
      expect(wrapper.vm.modalDisplayed).toBe(false)
    })
    it('@approve - emitted when approval button is clicked', async () => {
      const approvalButton = await wrapper.findComponent(BaseButton).find('button')
      await approvalButton.trigger('click')

      expect(wrapper.emitted('approve').length).toBe(1)
      expect(wrapper.emitted('approve')[0]).toStrictEqual([])
      expect(wrapper.vm.modalDisplayed).toBe(false)
    })
    it('@update:modalDisplayed(DismissibleModal) - triggers @update:modalDisplayed with value true', async () => {
      const dismissModal = await wrapper.findComponent(DismissibleModal)
      await dismissModal.vm.emit('update:modalDisplayed', true)

      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([true])
    })
  })

  describe('#slots', () => {
    it('#trigger - sets modalDisplayed to true if openModal is called', async () => {
      let openModal
      const wrapper = mount(ApprovalModal, {
        props: { title: 'Title' },
        slots: {
          trigger: (params) => {
            openModal = params.openModal
            return ''
          }
        }
      })
      await openModal()
      expect(wrapper.emitted('update:modalDisplayed').length).toBe(1)
      expect(wrapper.emitted('update:modalDisplayed')[0]).toStrictEqual([true])
    })
  })
})
