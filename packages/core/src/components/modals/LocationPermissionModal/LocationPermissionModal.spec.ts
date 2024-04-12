import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi
} from 'vitest'
import { mount } from '@vue/test-utils'
import BaseModal from '../BaseModal/BaseModal.vue'
import LocationPermissionModal from './LocationPermissionModal.vue'

describe('LocationPermissionModal', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = (visible?: boolean, locationDenied?: boolean) => {
    return mount(LocationPermissionModal, {
      attachTo: document.body,
      props: {
        visible,
        locationDenied
      }
    })
  }

  beforeAll(() => {
    // TODO: remove when JSDom supports HTMLDialogElement https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.show = vi.fn()
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    wrapper = mountComponent()
  })

  afterEach(() => {
    wrapper && wrapper.unmount()
    vi.clearAllMocks()
  })

  describe(':props', () => {
    describe(':visible', () => {
      it('initially sets modalDisplayed of BaseModal to false', async () => {
        const baseModal = wrapper.findComponent(BaseModal)

        expect(baseModal.props('modalDisplayed')).toBe(false)
      })

      it('initially sets modalDisplayed of BaseModal to true if specified', async () => {
        wrapper = mountComponent(true)
        const baseModal = wrapper.findComponent(BaseModal)

        expect(baseModal.props('modalDisplayed')).toBe(true)
      })

      it('updates displayModal of modal to true if set after mount', async () => {
        const baseModal = wrapper.findComponent(BaseModal)

        await wrapper.setProps({ visible: true })

        expect(baseModal.props('modalDisplayed')).toBe(true)
      })

      it('updates displayModal of modal to false if set after mount', async () => {
        wrapper = mountComponent(true)
        const baseModal = wrapper.findComponent(BaseModal)

        await wrapper.setProps({ visible: false })

        expect(baseModal.props('modalDisplayed')).toBe(false)
      })
    })
  })

  describe('@events', () => {
    it('@grant-click - is fired when grant button is clicked', async () => {
      await wrapper.find('.grant-button').trigger('click')
      expect(wrapper.emitted('grant-click')?.length).toBe(1)
    })
  })
})
