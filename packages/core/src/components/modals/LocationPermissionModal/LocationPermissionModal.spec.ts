import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import LocationPermissionModal from './LocationPermissionModal.vue'
import DismissibleModal from '../DismissibleModal/DismissibleModal.vue'

describe('LocationPermissionModal', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = (visible?: boolean, locationDenied?: boolean) => {
    return shallowMount(LocationPermissionModal, {
      props: {
        visible,
        locationDenied
      },
      global: {
        stubs: {
          DismissibleModal: {
            template: '<div><slot></slot></div>',
            props: ['modalDisplayed'],
            emits: ['update:modal-displayed']
          }
        }
      }
    })
  }

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
        const dismissibleModal = wrapper.findComponent(DismissibleModal)

        expect(dismissibleModal.props('modalDisplayed')).toBe(false)
      })

      it('initially sets modalDisplayed of BaseModal to true if specified', async () => {
        wrapper = mountComponent(true)
        const dismissibleModal = wrapper.findComponent(DismissibleModal)

        expect(dismissibleModal.props('modalDisplayed')).toBe(true)
      })

      it('updates displayModal of modal to true if set after mount', async () => {
        const dismissibleModal = wrapper.findComponent(DismissibleModal)

        await wrapper.setProps({ visible: true })

        expect(dismissibleModal.props('modalDisplayed')).toBe(true)
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
