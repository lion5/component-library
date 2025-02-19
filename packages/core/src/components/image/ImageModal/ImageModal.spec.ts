import { mount } from '@vue/test-utils'
import { afterEach, beforeAll, beforeEach, describe, expect, it, vi } from 'vitest'
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import { ImageSizes } from '@core/models/image/imageSizes'
import type { defineComponent } from 'vue'
import { ImageResponse } from '@core/models/image/imageResponse'

describe('ImageModal', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeAll(() => {
    // FIX to be able to use dialog field in jsdom. See https://github.com/jsdom/jsdom/issues/3294
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()
  })

  beforeEach(() => {
    wrapper = mount(ImageModal, {
      attachTo: document.body,
      props: {
        image: new ImageResponse(4711, 'testAltTag', new ImageSizes()),
        aspectRatio: '16/9'
      }
    })
  })
  afterEach(() => {
    wrapper.unmount()
  })
  describe(':props', () => {
    it(':showModal - is applied to BasicPortalModal', async () => {
      const showModal = true
      await wrapper.setProps({ showModal })

      expect(wrapper.findComponent(DismissibleModal).vm.modalDisplayed).toStrictEqual(showModal)
    })
    it(':image - image large size is applied to img tag when available', async () => {
      const image = new ImageResponse(
        4711,
        'testAltTag',
        new ImageSizes('original', '', '', '', 'large')
      )
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('src')).toBe(image.sizes.large)
    })
    it(':image - image original size is applied to img tag when large size is not available', async () => {
      const image = new ImageResponse(4711, 'testAltTag', new ImageSizes('original'))
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('src')).toBe(image.sizes.original)
    })
    it(':image - image alt is applied to img tag', async () => {
      const image = new ImageResponse(4711, 'testAltTag', new ImageSizes('original'))
      await wrapper.setProps({ image })

      const imageItem = wrapper.find('img')
      expect(imageItem.attributes('alt')).toBe(image.alt)
    })
    it(':aspectRatio - is applied to custom prop', async () => {
      const aspectRatio = '42/7'
      await wrapper.setProps({ aspectRatio })

      const modalContent = wrapper.find('.modal-content')
      expect(modalContent.attributes('style')).toBe(
        `--image-edit-input-aspect-ratio: ${aspectRatio};`
      )
    })
  })
})
