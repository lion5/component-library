import { flushPromises, mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import type { defineComponent } from 'vue'
import { MultiScaleImage } from '@core/components/image/models/multiScaleImage'
import ImageThumbCarousel from '@core/components/image/ImageThumbCarousel/ImageThumbCarousel.vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'
import ImageCarousel from '@core/components/image/ImageCarousel/ImageCarousel.vue'
import ImageSlider from '@core/components/image/ImageSlider/ImageSlider.vue'

describe('ImageThumbCarousel.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  let images: MultiScaleImage[]
  let thumbnails: MinimalImage[]
  let baseImages: MinimalImage[]
  let fullSizeImages: MinimalImage[]

  beforeAll(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
    // FIX to be able to use scrollIntoView in jsdom. See https://github.com/jsdom/jsdom/issues/1695
    Element.prototype.scrollIntoView = vi.fn()
  })

  beforeEach(() => {
    images = [
      new MultiScaleImage(
        4711,
        'testAltTag',
        new ImageSizes('original-1', '', 'small-1', '', 'large-1')
      ),
      new MultiScaleImage(
        4712,
        'testAltTag',
        new ImageSizes('original-2', '', 'small-2', '', 'large-2')
      ),
      new MultiScaleImage(
        4713,
        'testAltTag',
        new ImageSizes('original-3', '', 'small-3', '', 'large-3')
      )
    ]
    thumbnails = images.map((image) => new MinimalImage(image.id, image.alt, image.sizes.small))
    baseImages = images.map((image) => new MinimalImage(image.id, image.alt, image.sizes.large))
    fullSizeImages = images.map((image) => new MinimalImage(image.id, image.alt, image.sizes.original))

    wrapper = mount(ImageThumbCarousel, {
      propsData: {
        images,
      }
    })
  })
  describe(':props', () => {
    it(':images - applied to components', async () => {
      // Open full size carousel
      await wrapper.findComponent(ImageCarousel).vm.$emit('click')
      await flushPromises()

      expect(wrapper.findAllComponents(ImageCarousel).at(0).props('images')).toEqual(baseImages)
      expect(wrapper.findAllComponents(ImageCarousel).at(0).props('selectedImage')).toEqual(baseImages[0])
      expect(wrapper.findAllComponents(ImageCarousel).at(1).props('images')).toEqual(fullSizeImages)
      expect(wrapper.findAllComponents(ImageCarousel).at(1).props('selectedImage')).toEqual(fullSizeImages[0])
      expect(wrapper.findComponent(ImageSlider).props('images')).toEqual(thumbnails)
      expect(wrapper.findComponent(ImageSlider).props('selectedImage')).toEqual(thumbnails[0])
    })
  })
  describe('@events', () => {
    it('@click - opens full size carousel', async () => {
      await wrapper.findComponent(ImageCarousel).vm.$emit('click')
      await flushPromises()

      expect(wrapper.findAllComponents(ImageCarousel).length).toBe(2)
    })
    it('@update:selected-image - update selected image for all sizes if thumbnail slider emits', async () => {
      await wrapper.findComponent(ImageSlider).vm.$emit('update:selectedImage', thumbnails[1])
      await flushPromises()

      // Open full size carousel
      await wrapper.findComponent(ImageCarousel).vm.$emit('click')
      await flushPromises()

      expect(wrapper.findAllComponents(ImageCarousel).at(0).props('selectedImage')).toEqual(baseImages[1])
      expect(wrapper.findAllComponents(ImageCarousel).at(1).props('selectedImage')).toEqual(fullSizeImages[1])
      expect(wrapper.findComponent(ImageSlider).props('selectedImage')).toEqual(thumbnails[1])
    })
    it('@update:selected-image - update selected image for all sizes if base image carousel emits', async () => {
      await wrapper.findAllComponents(ImageCarousel).at(0).vm.$emit('update:selectedImage', baseImages[1])
      await flushPromises()

      // Open full size carousel
      await wrapper.findComponent(ImageCarousel).vm.$emit('click')
      await flushPromises()

      expect(wrapper.findAllComponents(ImageCarousel).at(0).props('selectedImage')).toEqual(baseImages[1])
      expect(wrapper.findAllComponents(ImageCarousel).at(1).props('selectedImage')).toEqual(fullSizeImages[1])
      expect(wrapper.findComponent(ImageSlider).props('selectedImage')).toEqual(thumbnails[1])
    })
    it('@update:selected-image - update selected image for all sizes if full size carousel emits', async () => {
      // Open full size carousel
      await wrapper.findComponent(ImageCarousel).vm.$emit('click')
      await flushPromises()

      await wrapper.findAllComponents(ImageCarousel).at(1).vm.$emit('update:selectedImage', thumbnails[1])
      await flushPromises()

      expect(wrapper.findAllComponents(ImageCarousel).at(0).props('selectedImage')).toEqual(baseImages[1])
      expect(wrapper.findAllComponents(ImageCarousel).at(1).props('selectedImage')).toEqual(fullSizeImages[1])
      expect(wrapper.findComponent(ImageSlider).props('selectedImage')).toEqual(thumbnails[1])
    })
  })
})
