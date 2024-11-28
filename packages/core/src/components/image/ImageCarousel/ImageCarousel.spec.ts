import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'
import ImageCarousel from '@core/components/image/ImageCarousel/ImageCarousel.vue'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'

describe('ImageCarousel.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  let images: MinimalImage[]

  beforeEach(() => {
    images = [
      new MinimalImage(
        1,
        'alt',
        'https://dummyimage.com/2000x1000/ff0000/fff.png'
      ),
      new MinimalImage(
        2,
        'alt',
        'https://dummyimage.com/2000x2000/aa0000/fff.png'
      ),
      new MinimalImage(
        3,
        'alt',
        'https://dummyimage.com/2000x1000/990000/fff.png'
      )
    ]
    wrapper = mount(ImageCarousel, {
      props: {
        images
      }
    })
  })
  describe(':props', () => {
    it(':images - first image is rendered by default', async () => {
      expect(wrapper.findComponent(BaseImage).props().image).toStrictEqual(images[0])
    })
  })
  describe('@events', () => {
    it('@previous - emitted if left button clicked', async () => {
      await wrapper.find('.left-arrow').trigger('click')

      expect(wrapper.emitted('previous')).toHaveLength(1)
      expect(wrapper.findComponent(BaseImage).props().image).toStrictEqual(images[2])
    })

    it('@next - emitted if right button clicked', async () => {
      await wrapper.find('.right-arrow').trigger('click')

      expect(wrapper.emitted('next')).toHaveLength(1)
      expect(wrapper.findComponent(BaseImage).props().image).toStrictEqual(images[1])
    })
  })
})
