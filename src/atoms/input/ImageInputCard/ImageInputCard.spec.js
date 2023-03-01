import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import ImageDropArea from '@/base/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import ImageInputCard from '@/base/components/input/ImageInputCard/ImageInputCard.vue'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageInputCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageInputCard, {
      propsData: {
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      localVue
    })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':value - displays ImageAddCard when undefined', async () => {
      const value = undefined
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.exists()).toBeFalsy()
      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.exists()).toBeTruthy()
    })
    it(':value - displays ImageAddCard when image.removed is true', async () => {
      const value = new PortalImage()
      value.removed = true
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.exists()).toBeFalsy()
      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.exists()).toBeTruthy()
    })
    it(':value - displays ImageEditCard when value exists', async () => {
      const value = new PortalImage()
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.exists()).toBeTruthy()
      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.exists()).toBeFalsy()
    })
    it(':value - is applied to ImageEditCard', async () => {
      const value = new PortalImage(4711)
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.value).toBe(value)
    })
    it(':imageConstraints - are applied to ImageEditCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      const value = new PortalImage()
      await wrapper.setProps({
        value,
        imageConstraints
      })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.imageConstraints).toBe(imageConstraints)
    })
    it(':imageConstraints - acceptedMimeTypes is applied to ImageAddCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({
        imageConstraints,
        value: undefined
      })

      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.vm.acceptedMimeTypes).toBe(imageConstraints.mimeTypes)
    })
  })
  describe('@events', () => {
    it(':input - is triggered when ImageDropArea emits input', async () => {
      await wrapper.setProps({ value: undefined })
      const portalImage = new PortalImage(1)

      const imageDropArea = wrapper.findComponent(ImageDropArea)
      await imageDropArea.vm.$emit('input', portalImage)

      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
    it(':input - is triggered with undefined when ImageEditCard emits remove', async () => {
      const value = new PortalImage(0)
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      await imageEditCard.vm.$emit('remove')

      expect(wrapper.emitted('input')[0]).toStrictEqual([undefined])
    })
  })
})
