import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageEditModal from '@/base/components/input/ImageEditModal/ImageEditModal.vue'
import ImageModal from '@/base/components/image/ImageModal/ImageModal.vue'
import PortalErrorBox from '@/base/components/PortalErrorBox.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageEditModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageEditModal, {
      propsData: {
        imageValue: new PortalImage(),
        imageConstraints: new ImageConstraints(undefined, '4/3'),
        staticModal: true
      },
      localVue
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':value - is applied to ImageModal', async () => {
      const value = true
      await wrapper.setProps({ value })

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.value).toBe(value)
    })
    it(':imageValue - is applied to ImageModal', async () => {
      const imageValue = new PortalImage()
      await wrapper.setProps({ imageValue })

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.image).toBe(imageValue)
    })
    it(':imageValue - errors are applied to PortalErrorBox', async () => {
      const imageValue = new PortalImage()
      imageValue.errors = [new Error()]
      await wrapper.setProps({ imageValue })

      const portalErrorBox = wrapper.findComponent(PortalErrorBox)
      expect(portalErrorBox.vm.errors).toBe(imageValue.errors)
    })
    it(':imageConstraints - aspectRatio is applied to ImageModal', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.aspectRatio).toBe(imageConstraints.aspectRatio)
    })
  })
  describe('@events', () => {
    it(':input - is triggered when ImageModal emits input', async () => {
      const imageModal = wrapper.findComponent(ImageModal)
      await imageModal.vm.$emit('input', false)

      expect(wrapper.emitted('input')[0]).toStrictEqual([false])
    })
  })
})
