import { mount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { Gallery } from '@core/atoms/image/models/gallery'
import { PortalImage } from '@core/atoms/image/models/image'
import { ImageSizes } from '@core/atoms/image/models/imageSizes'
import ImageCard from '@core/atoms/image/ImageCard/ImageCard.vue'
import ImageGallery from '@core/atoms/image/ImageGallery/ImageGallery.vue'

describe('ImageGallery', () => {
  let wrapper
  let gallery
  let aspectRatio

  beforeEach(() => {
    gallery = new Gallery([
      new PortalImage(
        4711,
        'testAltTag',
        undefined,
        undefined,
        new ImageSizes('original', '', '', 'mid')
      ),
      new PortalImage(
        4712,
        'testAltTag',
        undefined,
        undefined,
        new ImageSizes('original', '', '', 'mid')
      ),
      new PortalImage(
        4713,
        'testAltTag',
        undefined,
        undefined,
        new ImageSizes('original', '', '', 'mid')
      )
    ])
    aspectRatio = '16/9'
    wrapper = mount(ImageGallery, {
      propsData: {
        gallery,
        aspectRatio
      }
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':gallery - is rendered', async () => {
      const imageCards = wrapper.findAllComponents(ImageCard)
      expect(imageCards).toHaveLength(gallery.images.length)
    })
    it(':aspectRatio - is applied to all images', async () => {
      const imageCards = wrapper.findAllComponents(ImageCard)
      expect(imageCards.at(0).vm.aspectRatio).toBe(aspectRatio)
      expect(imageCards.at(1).vm.aspectRatio).toBe(aspectRatio)
      expect(imageCards.at(2).vm.aspectRatio).toBe(aspectRatio)
    })
  })
})
