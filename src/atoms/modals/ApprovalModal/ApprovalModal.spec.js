import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from 'vitest'
import { mount } from '@vue/test-utils'
import ApprovalModal from '@/atoms/modals/ApprovalModal/ApprovalModal.vue'
import BaseButton from '@/atoms/buttons/BaseButton/BaseButton.vue'

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
        buttonLabel: 'ButtonLabel',
      },
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
  })

  describe('#slots', () => {
    it('#trigger - sets modalDisplayed to true if open is called', async () => {
      let open
      const wrapper = mount(ApprovalModal, {
        props: {title: 'Title'},
        slots: {
          trigger: (params) => {
            open = params.open
            return ''
          },
        },
      })
      await open()
      expect(wrapper.vm.modalDisplayed).toBe(true)
    })
  })
})
