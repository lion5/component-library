import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import ImageEditModal from '@core/components/inputs/image/ImageEditModal/ImageEditModal.vue'
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import { ImageForm } from '@core/models/image/imageForm'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import { ImageResponse } from '@core/models/image/imageResponse'

describe('ImageEditModal.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageEditModal, {
      props: {
        showModal: false,
        image: new ImageForm(),
        imageConstraints: new ImageConstraints(undefined, '4/3'),
      },
      global: {
        stubs: {
          DismissibleModal: {
            template: '<div><slot></slot></div>'
          }
        }
      }
    })
  })

  describe(':props', () => {
    it(':showModal - is applied to ImageModal', async () => {
      const showModal = true
      await wrapper.setProps({ showModal })

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.props().showModal).toBe(showModal)
    })
    it(':image - is applied to ImageModal', async () => {
      const image = new ImageForm()
      await wrapper.setProps({ image })
      const expectedImage = new ImageResponse(image.id || -1, image.alt || '', image.sizes)

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.props().image).toStrictEqual(expectedImage)
    })
    it(':image - errors are applied to PortalErrorBox', async () => {
      const image = new ImageForm()
      image.errors = [new Error()]
      await wrapper.setProps({ image })

      const errorBox = wrapper.findComponent(ErrorBox)
      expect(errorBox.props().errors).toStrictEqual(image.errors)
    })
    it(':imageConstraints - aspectRatio is applied to ImageModal', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageModal = wrapper.findComponent(ImageModal)
      expect(imageModal.props().aspectRatio).toBe(imageConstraints.aspectRatio)
    })
  })
  describe('@events', () => {
    it('@update:showModal - is triggered when ImageModal emits input', async () => {
      const imageModal = wrapper.findComponent(ImageModal)
      await imageModal.vm.$emit('update:showModal', true)

      expect(wrapper.emitted('update:showModal')[0]).toStrictEqual([true])
    })
  })
})
