import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'
import { ImageResponse } from '@core/models/image/imageResponse'
import { ImageSizes } from '@core/models/image/imageSizes'

describe('ImageCard', () => {
  let wrapper: ReturnType<typeof mount>
  let imageResponse: ImageResponse
  let aspectRatio: string

  beforeAll(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    imageResponse = new ImageResponse(
      4711,
      'testAltTag',
      new ImageSizes('original', '', '', 'mid')
    )
    aspectRatio = '16/9'
    wrapper = mount(ImageCard, {
      propsData: {
        image: imageResponse,
        aspectRatio
      }
    })
  })

  describe(':props', () => {
    it(':image - is applied to ImageModal', async () => {
      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.vm.image).toStrictEqual(imageResponse)
    })
    it(':image - image medium size is applied to img tag when available', async () => {
      const image = wrapper.find('.media > img')
      expect(image.attributes('src')).toBe(imageResponse.sizes.mid)
    })
    it(':image - image original size is applied to img tag when medium size is not available', async () => {
      const localPortalImage = new ImageResponse(
        4711,
        'testAltTag',
        new ImageSizes('original')
      )
      await wrapper.setProps({ image: localPortalImage })

      const image = wrapper.find('.media > img')
      expect(image.attributes('src')).toBe(imageResponse.sizes.original)
    })
    it(':image - image alt is applied to img tag', async () => {
      const image = wrapper.find('.media > img')
      expect(image.attributes('alt')).toBe(imageResponse.alt)
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
