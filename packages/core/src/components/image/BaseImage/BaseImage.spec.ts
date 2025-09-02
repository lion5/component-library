import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'

describe('BaseImage.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>
  let image: MinimalImage

  beforeEach(() => {
    image = new MinimalImage(4711, 'testAltTag', 'url')
    wrapper = mount(BaseImage, {
      props: {
        image
      }
    })
  })

  describe(':props', () => {
    it(':image - is applied to img', async () => {
      const imageElement = wrapper.find('img')

      expect(imageElement.attributes('src')).toBe(image.url)
      expect(imageElement.attributes('alt')).toBe(image.alt)
    })
  })
})
