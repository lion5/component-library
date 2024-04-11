import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { Gallery } from '@core/components/image/models/gallery'
import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import ImageGallery from '@core/components/image/ImageGallery/ImageGallery.vue'

describe('ImageGallery', () => {
  let wrapper
  let gallery
  let aspectRatio

  beforeAll(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

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
