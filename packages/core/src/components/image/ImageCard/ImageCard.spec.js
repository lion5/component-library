import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'

describe('ImageCard', () => {
  let wrapper
  let portalImage
  let aspectRatio

  beforeAll(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    portalImage = new PortalImage(4711, 'testAltTag')
    portalImage.sizes = new ImageSizes('original', '', '', 'mid')
    aspectRatio = '16/9'
    wrapper = mount(ImageCard, {
      propsData: {
        image: portalImage,
        aspectRatio
      }
    })
  })

  describe(':props', () => {
    it(':image - is applied to ImageModal', async () => {
      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.image).toStrictEqual(portalImage)
    })
    it(':image - image medium size is applied to img tag when available', async () => {
      const image = wrapper.find('.media > img')
      expect(image.attributes('src')).toBe(portalImage.sizes.mid)
    })
    it(':image - image original size is applied to img tag when medium size is not available', async () => {
      const localPortalImage = new PortalImage()
      localPortalImage.sizes = new ImageSizes('original')
      await wrapper.setProps({ image: localPortalImage })

      const image = wrapper.find('.media > img')
      expect(image.attributes('src')).toBe(portalImage.sizes.original)
    })
    it(':image - image alt is applied to img tag', async () => {
      const image = wrapper.find('.media > img')
      expect(image.attributes('alt')).toBe(portalImage.alt)
    })
    it(':aspectRatio - is applied to ImageModal', async () => {
      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.aspectRatio).toBe(aspectRatio)
    })
    it(':aspectRatio - is applied to custom prop', async () => {
      const aspectRatio = '42/7'
      await wrapper.setProps({ aspectRatio })

      const itemCard = wrapper.findComponent(ItemCard)
      expect(itemCard.attributes('style')).toBe(
        `--image-edit-input-aspect-ratio: ${aspectRatio};`
      )
    })
  })
  describe('Component', () => {
    it('ImageModal is opened when image is clicked', async () => {
      const media = wrapper.find('.media')
      await media.trigger('click')

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.showModal).toBe(true)
    })
  })
})
