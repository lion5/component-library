import { mount } from '@vue/test-utils'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import { Gallery } from '@/base/models/gallery'
import ImageEditCardDraggable from '@/base/components/input/ImageEditCardDraggable/ImageEditCardDraggable.vue'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import ImageDropArea from '@/base/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import SortableImageGalleryInput from '@/base/components/input/SortableImageGalleryInput/SortableImageGalleryInput.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('SortableImageGalleryInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(SortableImageGalleryInput, {
      propsData: {
        value: new Gallery(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      }
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

      const imageCards = wrapper.findAllComponents(ImageEditCardDraggable)
      expect(imageCards.length).toBe(3)
    })
    it(':value - applies image on ImageEditCardDraggable', async () => {
      const portalImage = new PortalImage()
      const value = new Gallery([portalImage])
      await wrapper.setProps({ value })

      const imageCards = wrapper.findAllComponents(ImageEditCardDraggable)
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

      const imageCards = wrapper.findAllComponents(ImageEditCardDraggable)
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
