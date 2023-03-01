import { mount } from '@vue/test-utils'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import ImageModal from '@/base/components/image/ImageModal/ImageModal.vue'
import BasicPortalModal from '@/base/components/modals/BasicPortalModal/BasicPortalModal.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('ImageModal', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageModal, {
      attachTo: document.body,
      propsData: {
        image: new PortalImage(4711, 'testAltTag'),
        aspectRatio: '16/9',
        staticModal: true
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':value - is applied to BasicPortalModal', async () => {
      const value = true
      await wrapper.setProps({ value })

      const basicModal = wrapper.findComponent(BasicPortalModal)
      expect(basicModal.vm.value).toStrictEqual(value)
    })
    it(':image - image large size is applied to img tag when available', async () => {
      const image = new PortalImage(4711, 'testAltTag', undefined, undefined, new ImageSizes('original', '', '', '', 'large'))
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('src')).toBe(image.sizes.large)
    })
    it(':image - image original size is applied to img tag when large size is not available', async () => {
      const image = new PortalImage(4711, 'testAltTag', undefined, undefined, new ImageSizes('original'))
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('src')).toBe(image.sizes.original)
    })
    it(':image - image alt is applied to img tag', async () => {
      const image = new PortalImage(4711, 'testAltTag', undefined, undefined, new ImageSizes('original'))
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('alt')).toBe(image.alt)
    })
    it(':aspectRatio - is applied to custom prop', async () => {
      const aspectRatio = '42/7'
      await wrapper.setProps({ aspectRatio })

      const modalContent = wrapper.find('.modal-body > .modal-content')
      expect(modalContent.attributes('style')).toBe(`--image-edit-input-aspect-ratio: ${aspectRatio};`)
    })
  })
})
