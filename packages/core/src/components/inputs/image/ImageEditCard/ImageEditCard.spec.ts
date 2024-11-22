import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import { PortalImage } from '@/base/models/image'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import OverlayError from '@/base/components/overlays/OverlayError.vue'
import { ImageConstraints } from '@/base/models/imageConstraints'
import OverlayBusy from '@/base/components/overlays/OverlayBusy.vue'
import CardBadgePublished from '@/base/components/card/CardBadgePublished/CardBadgePublished.vue'
import CardDismissButton from '@/base/components/card/CardDismissButton/CardDismissButton.vue'
import ImageCard from '@/base/components/image/ImageCard/ImageCard.vue'
import ImageEditModal from '@/base/components/input/ImageEditModal/ImageEditModal.vue'
import Vue from 'vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageEditCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageEditCard, {
      propsData: {
        value: new PortalImage(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      localVue
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':value - image card is displayed when image is not removed', async () => {
      const value = new PortalImage()
      value.removed = false
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.exists()).toBeTruthy()
    })
    it(':value - image card is hidden when image is removed', async () => {
      const value = new PortalImage()
      value.removed = true
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.exists()).toBeFalsy()
    })
    it(':value - image card class published is applied when image is published', async () => {
      const value = new PortalImage(4711)
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('published')).toBeTruthy()
    })
    it(':value - image card class published is removed when image is not published', async () => {
      const value = new PortalImage()
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('published')).toBeFalsy()
    })
    it(':value - image card class busy is applied when image is busy', async () => {
      const value = new PortalImage()
      value.busy = true
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('busy')).toBeTruthy()
    })
    it(':value - image card class busy is removed when image is not busy', async () => {
      const value = new PortalImage()
      value.busy = false
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.classes('busy')).toBeFalsy()
    })
    it(':value - image card :image is applied', async () => {
      const value = new PortalImage(4711, 'testImage')
      await wrapper.setProps({ value })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.vm.image).toBe(value)
    })
    it(':value - error overlay is displayed when image has error', async () => {
      const value = new PortalImage()
      value.errors = [new Error('test error')]
      await wrapper.setProps({ value })

      const overlayError = wrapper.findComponent(OverlayError)
      expect(overlayError.exists()).toBeTruthy()
    })
    it(':value - error overlay is hidden when image has no error', async () => {
      const value = new PortalImage()
      await wrapper.setProps({ value })

      const overlayError = wrapper.findComponent(OverlayError)
      expect(overlayError.exists()).toBeFalsy()
    })
    it(':value - busy overlay is displayed when image.busy is true', async () => {
      const value = new PortalImage()
      value.busy = true
      await wrapper.setProps({ value })

      const overlayBusy = wrapper.findComponent(OverlayBusy)
      expect(overlayBusy.exists()).toBeTruthy()
    })
    it(':value - busy overlay is hidden when image.busy is false', async () => {
      const value = new PortalImage()
      value.busy = false
      await wrapper.setProps({ value })

      const overlayBusy = wrapper.findComponent(OverlayBusy)
      expect(overlayBusy.exists()).toBeFalsy()
    })
    it(':value - dismiss button is displayed when image.busy is false', async () => {
      const value = new PortalImage()
      value.busy = false
      await wrapper.setProps({ value })

      const dismissButton = wrapper.findComponent(CardDismissButton)
      expect(dismissButton.exists()).toBeTruthy()
    })
    it(':value - dismiss button is hidden when image.busy is true', async () => {
      const value = new PortalImage()
      value.busy = true
      await wrapper.setProps({ value })

      const dismissButton = wrapper.findComponent(CardDismissButton)
      expect(dismissButton.exists()).toBeFalsy()
    })
    it(':value - published badge is displayed when image is published', async () => {
      const value = new PortalImage('4711')
      await wrapper.setProps({ value })

      const cardBadgePublished = wrapper.findComponent(CardBadgePublished)
      expect(cardBadgePublished.exists()).toBeTruthy()
    })
    it(':value - published badge is hidden when image is not published', async () => {
      const value = new PortalImage()
      await wrapper.setProps({ value })

      const cardBadgePublished = wrapper.findComponent(CardBadgePublished)
      expect(cardBadgePublished.exists()).toBeFalsy()
    })
    it(':value - ImageEditModal :image-value is applied', async () => {
      const value = new PortalImage(4711, 'testImage')
      await wrapper.setProps({ value })

      const imageEditModal = wrapper.findComponent(ImageEditModal)
      expect(imageEditModal.vm.imageValue).toBe(value)
    })
    it(':imageConstraints - aspect ratio is applied to ImageCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageCard = wrapper.findComponent(ImageCard)
      expect(imageCard.vm.aspectRatio).toBe(imageConstraints.aspectRatio)
    })
    it(':imageConstraints - are applied to ImageEditModal', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageEditModal = wrapper.findComponent(ImageEditModal)
      expect(imageEditModal.vm.imageConstraints).toBe(imageConstraints)
    })
  })
  describe('@events', () => {
    it(':input - is triggered when updateImage was fired', async () => {
      const portalImage = new PortalImage(1)
      const imageEditModal = wrapper.findComponent(ImageEditModal)
      await imageEditModal.vm.$emit('updateImage', portalImage)
      await Vue.nextTick()

      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
  })
})
