import { createLocalVue, mount } from '@vue/test-utils'
import ImageCard from '@/base/components/image/ImageCard/ImageCard.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import ImageGallery from '@/base/components/image/ImageGallery/ImageGallery.vue'
import { Gallery } from '@/base/models/gallery'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('ImageGallery', () => {
  let wrapper
  let gallery
  let aspectRatio

  beforeEach(() => {
    gallery = new Gallery([
      new PortalImage(4711, 'testAltTag', undefined, undefined, new ImageSizes('original', '', '', 'mid')),
      new PortalImage(4712, 'testAltTag', undefined, undefined, new ImageSizes('original', '', '', 'mid')),
      new PortalImage(4713, 'testAltTag', undefined, undefined, new ImageSizes('original', '', '', 'mid'))
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
