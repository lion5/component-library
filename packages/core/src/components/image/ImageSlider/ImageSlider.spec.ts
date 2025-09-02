import { mount } from '@vue/test-utils'
import { beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import type { defineComponent } from 'vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'
import ImageSlider from '@core/components/image/ImageSlider/ImageSlider.vue'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'

describe('ImageSlider.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  let images: MinimalImage[]

  beforeAll(() => {
    // FIX to be able to use scrollIntoView in jsdom. See https://github.com/jsdom/jsdom/issues/1695
    Element.prototype.scrollIntoView = vi.fn()
  })

  beforeEach(() => {
    images = [
      new MinimalImage(1, 'alt', 'https://dummyimage.com/2000x1000/ff0000/fff.png'),
      new MinimalImage(2, 'alt', 'https://dummyimage.com/2000x2000/aa0000/fff.png'),
      new MinimalImage(3, 'alt', 'https://dummyimage.com/2000x1000/990000/fff.png')
    ]
    wrapper = mount(ImageSlider, {
      props: {
        images
      }
    })
  })
  describe(':props', () => {
    it(':images - are rendered', async () => {
      expect(wrapper.findAllComponents(BaseImage).length).toBe(images.length)
    })
  })
  describe('@events', () => {
    it('@update:selectedImage - emitted if image selected', async () => {
      await wrapper.findAll('input')[1].trigger('change')

      expect(wrapper.emitted('update:selectedImage')).toHaveLength(1)
      expect(wrapper.emitted('update:selectedImage')[0]).toEqual([images[1]])
      expect(wrapper.findAll('label').at(1).wrapperElement.scrollIntoView).toHaveBeenCalledWith({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center'
      })
    })
  })
})
