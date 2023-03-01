import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageGalleryInput from '@/base/components/input/ImageGalleryInput/ImageGalleryInput.vue'
import { Gallery } from '@/base/models/gallery'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import ImageDropArea from '@/base/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageGalleryInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageGalleryInput, {
      propsData: {
        value: new Gallery(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      localVue
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':value - renders ImageEditCardDraggable for each image in gallery', async () => {
      const portalImage = new PortalImage()
      const value = new Gallery([portalImage, portalImage, portalImage])
      await wrapper.setProps({ value })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.length).toBe(3)
    })
    it(':value - applies image on ImageEditCardDraggable', async () => {
      const portalImage = new PortalImage()
      const value = new Gallery([portalImage])
      await wrapper.setProps({ value })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.at(0).vm.value).toBe(portalImage)
    })
    it(':imageConstraints - are applied to each ImageEditCardDraggable', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      const portalImage = new PortalImage()
      const value = new Gallery([portalImage])
      await wrapper.setProps({
        value,
        imageConstraints
      })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.at(0).vm.imageConstraints).toBe(imageConstraints)
    })
    it(':imageConstraints - acceptedMimeTypes is applied to ImageAddCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.vm.acceptedMimeTypes).toBe(imageConstraints.mimeTypes)
    })
  })
  describe('@events', () => {
    it(':input - is triggered when ImageDropArea emits input', async () => {
      const value = new Gallery([new PortalImage(0)])
      await wrapper.setProps({ value })
      const portalImage = new PortalImage(1)

      const imageDropArea = wrapper.findComponent(ImageDropArea)
      await imageDropArea.vm.$emit('input', portalImage)

      expect(wrapper.emitted('input')[0]).toStrictEqual([new Gallery([new PortalImage(0), portalImage])])
    })
    it(':input - is triggered when ImageAddCard emits input', async () => {
      const value = new Gallery([new PortalImage(0)])
      await wrapper.setProps({ value })
      const portalImage = new PortalImage(1)

      const imageAddCard = wrapper.findComponent(ImageAddCard)
      await imageAddCard.vm.$emit('input', portalImage)

      expect(wrapper.emitted('input')[0]).toStrictEqual([new Gallery([new PortalImage(0), portalImage])])
    })
  })
})
