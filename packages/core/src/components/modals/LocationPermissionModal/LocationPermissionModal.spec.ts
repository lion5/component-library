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
import LocationPermissionModal from './LocationPermissionModal.vue'
import DismissibleModal from '../DismissibleModal/DismissibleModal.vue'

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
    wrapper?.unmount()
    vi.clearAllMocks()
  })

  describe(':props', () => {
    describe(':visible', () => {
      it('initially sets modalDisplayed of BaseModal to false', async () => {
        const baseModal = wrapper.findComponent(DismissibleModal)

        expect(baseModal.props('modalDisplayed')).toBe(false)
      })

      it('initially sets modalDisplayed of BaseModal to true if specified', async () => {
        wrapper = mountComponent(true)
        const baseModal = wrapper.findComponent(DismissibleModal)

        expect(baseModal.props('modalDisplayed')).toBe(true)
      })

      it('updates displayModal of modal to true if set after mount', async () => {
        const baseModal = wrapper.findComponent(DismissibleModal)

        await wrapper.setProps({ visible: true })

        expect(baseModal.props('modalDisplayed')).toBe(true)
      })

      it('updates displayModal of modal to false if set after mount', async () => {
        wrapper = mountComponent(true)
        const dismissibleModal = wrapper.findComponent(DismissibleModal)

        await wrapper.setProps({ visible: false })

        expect(dismissibleModal.props('modalDisplayed')).toBe(false)
      })
    })
  })

  describe('@events', () => {
    it('@grant-click - is fired when grant button is clicked', async () => {
      await wrapper.find('.grant-button').trigger('click')
      expect(wrapper.emitted('grant-click')?.length).toBe(1)
    })
    it('should emit update:visible when @update:modal-displayed emits false', async () => {
      wrapper = mountComponent(true)
      const dismissibleModal = wrapper.findComponent(DismissibleModal)

      dismissibleModal.vm.$emit('update:modal-displayed', false)

      expect(wrapper.emitted('update:visible')).toEqual([[false]])
    })
  })
})
