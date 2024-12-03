import { mount } from '@vue/test-utils'
import { type defineComponent } from 'vue'
import { beforeEach, describe, expect, it } from 'vitest'
import { ImageForm } from '@core/models/image/imageForm'
import ImageEditCard from '@core/components/inputs/image/ImageEditCard/ImageEditCard.vue'
import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import OverlayError from '@core/components/overlays/OverlayError.vue'
import OverlayBusy from '@core/components/overlays/OverlayBusy.vue'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'
import CardBadgeSuccess from '@core/components/cards/CardBadgeSuccess/CardBadgeSuccess.vue'
import ImageEditModal from '@core/components/inputs/image/ImageEditModal/ImageEditModal.vue'


describe('ImageEditCard.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageEditCard, {
      props: {
        image: new ImageForm(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      global: {
        stubs: {
          ImageEditModal: true
        }
      }
    })
  })

  describe(':props', () => {
    it(':image - image card is displayed when image is not removed', async () => {
      const image = new ImageForm()
      image.removed = false
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.exists()).toBeTruthy()
    })
    it(':image - image card is hidden when image is removed', async () => {
      const image = new ImageForm()
      image.removed = true
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.exists()).toBeFalsy()
    })
    it(':image - image card class published is applied when image is published', async () => {
      const image = new ImageForm(4711)
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('published')).toBeTruthy()
    })
    it(':image - image card class published is removed when image is not published', async () => {
      const image = new ImageForm()
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('published')).toBeFalsy()
    })
    it(':image - image card class busy is applied when image is busy', async () => {
      const image = new ImageForm()
      image.busy = true
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('busy')).toBeTruthy()
    })
    it(':image - image card class busy is removed when image is not busy', async () => {
      const image = new ImageForm()
      image.busy = false
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('busy')).toBeFalsy()
    })
    it(':image - image card :image is applied', async () => {
      const image = new ImageForm(4711, 'testImage')
      await wrapper.setProps({ image })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.vm.image).toStrictEqual(image)
    })
    it(':image - error overlay is displayed when image has error', async () => {
      const image = new ImageForm()
      image.errors = [new Error('test error')]
      await wrapper.setProps({ image })

      const overlayError = wrapper.findComponent(OverlayError)
      expect(overlayError.exists()).toBeTruthy()
    })
    it(':image - error overlay is hidden when image has no error', async () => {
      const image = new ImageForm()
      await wrapper.setProps({ image })

      const overlayError = wrapper.findComponent(OverlayError)
      expect(overlayError.exists()).toBeFalsy()
    })
    it(':image - busy overlay is displayed when image.busy is true', async () => {
      const image = new ImageForm()
      image.busy = true
      await wrapper.setProps({ image })

      const overlayBusy = wrapper.findComponent(OverlayBusy)
      expect(overlayBusy.exists()).toBeTruthy()
    })
    it(':image - busy overlay is hidden when image.busy is false', async () => {
      const image = new ImageForm()
      image.busy = false
      await wrapper.setProps({ image })

      const overlayBusy = wrapper.findComponent(OverlayBusy)
      expect(overlayBusy.exists()).toBeFalsy()
    })
    it(':image - dismiss button is displayed when image.busy is false', async () => {
      const image = new ImageForm()
      image.busy = false
      await wrapper.setProps({ image })

      const dismissButton = wrapper.findComponent(CardDismissButton)
      expect(dismissButton.exists()).toBeTruthy()
    })
    it(':image - dismiss button is hidden when image.busy is true', async () => {
      const image = new ImageForm()
      image.busy = true
      await wrapper.setProps({ image })

      const dismissButton = wrapper.findComponent(CardDismissButton)
      expect(dismissButton.exists()).toBeFalsy()
    })
    it(':image - published badge is displayed when image is published', async () => {
      const image = new ImageForm(4711)
      await wrapper.setProps({ image })

      const cardBadgePublished = wrapper.findComponent(CardBadgeSuccess)
      expect(cardBadgePublished.exists()).toBeTruthy()
    })
    it(':image - published badge is hidden when image is not published', async () => {
      const image = new ImageForm()
      await wrapper.setProps({ image })

      const cardBadgePublished = wrapper.findComponent(CardBadgeSuccess)
      expect(cardBadgePublished.exists()).toBeFalsy()
    })
    it(':image - ImageEditModal :image-image is applied', async () => {
      const image = new ImageForm(4711, 'testImage')
      await wrapper.setProps({ image })

      const imageEditModal = wrapper.findComponent(ImageEditModal)
      expect(imageEditModal.props().image).toStrictEqual(image)
    })
    it(':imageConstraints - aspect ratio is applied to ImageCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.props().aspectRatio).toBe(imageConstraints.aspectRatio)
    })
    it(':imageConstraints - are applied to ImageEditModal', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageEditModal = wrapper.findComponent(ImageEditModal)
      expect(imageEditModal.props().imageConstraints).toStrictEqual(imageConstraints)
    })
  })
  describe('@events', () => {
    it(':update:image - is triggered when updateImage was fired', async () => {
      const portalImage = new ImageForm(1)
      const imageEditModal = wrapper.findComponent(ImageEditModal)
      await imageEditModal.vm.$emit('updateImage', portalImage)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:image')[0]).toStrictEqual([portalImage])
    })
  })
})
