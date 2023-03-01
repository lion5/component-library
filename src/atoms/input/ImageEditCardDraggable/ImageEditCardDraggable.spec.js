import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageEditCardDraggable from '@/base/components/input/ImageEditCardDraggable/ImageEditCardDraggable.vue'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import DraggableItem from '@/base/components/dragdrop/DraggableItem/DraggableItem.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageEditCardDraggable', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageEditCardDraggable, {
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
    it(':value - is applied to ImageEditCard', async () => {
      const value = new PortalImage(4711)
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.value).toBe(value)
    })
    it(':value - DraggableItem is displayed when image is not removed', async () => {
      const value = new PortalImage()
      value.removed = false
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(DraggableItem)
      expect(imageEditCard.exists()).toBeTruthy()
    })
    it(':value - DraggableItem is hidden when image is removed', async () => {
      const value = new PortalImage()
      value.removed = true
      await wrapper.setProps({ value })

      const imageEditCard = wrapper.findComponent(DraggableItem)
      expect(imageEditCard.exists()).toBeFalsy()
    })
    it(':imageConstraints - are applied to ImageEditCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.imageConstraints).toBe(imageConstraints)
    })
  })
  describe('@events', () => {
    it(':input - is triggered when ImageEditCard emits input', async () => {
      const portalImage = new PortalImage(1)
      const imageEditCard = wrapper.findComponent(ImageEditCard)
      await imageEditCard.vm.$emit('input', portalImage)

      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
    it(':drop - is triggered when DraggableItem emits drop', async () => {
      const draggableItem = wrapper.findComponent(DraggableItem)
      await draggableItem.vm.$emit('drop')

      expect(wrapper.emitted('drop').length).toBe(1)
    })
    it(':drag - is triggered when DraggableItem emits drag', async () => {
      const draggableItem = wrapper.findComponent(DraggableItem)
      await draggableItem.vm.$emit('drag')

      expect(wrapper.emitted('drag').length).toBe(1)
    })
  })
})
