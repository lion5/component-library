import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import ImageEditCardDraggable from '@core/components/inputs/image/ImageEditCardDraggable/ImageEditCardDraggable.vue'
import { ImageForm } from '@core/models/image/imageForm'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import ImageEditCard from '@core/components/inputs/image/ImageEditCard/ImageEditCard.vue'
import DraggableItem from '@core/components/dragdrop/DraggableItem/DraggableItem.vue'

describe('ImageEditCardDraggable.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageEditCardDraggable, {
      props: {
        image: new ImageForm(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      global: {
        stubs: {
          ImageEditCard: true
        }
      }
    })
  })

  describe(':props', () => {
    it(':image - is applied to ImageEditCard', async () => {
      const image = new ImageForm(4711)
      await wrapper.setProps({ image })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.image).toStrictEqual(image)
    })
    it(':image - DraggableItem is displayed when image is not removed', async () => {
      const image = new ImageForm()
      image.removed = false
      await wrapper.setProps({ image })

      const imageEditCard = wrapper.findComponent(DraggableItem)
      expect(imageEditCard.exists()).toBeTruthy()
    })
    it(':image - DraggableItem is hidden when image is removed', async () => {
      const image = new ImageForm()
      image.removed = true
      await wrapper.setProps({ image })

      const imageEditCard = wrapper.findComponent(DraggableItem)
      expect(imageEditCard.exists()).toBeFalsy()
    })
    it(':imageConstraints - are applied to ImageEditCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageEditCard = wrapper.findComponent(ImageEditCard)
      expect(imageEditCard.vm.imageConstraints).toStrictEqual(imageConstraints)
    })
  })
  describe('@events', () => {
    it('@update:image - is triggered when ImageEditCard emits update:image', async () => {
      const portalImage = new ImageForm(1)
      const imageEditCard = wrapper.findComponent(ImageEditCard)
      await imageEditCard.vm.$emit('update:image', portalImage)

      expect(wrapper.emitted('update:image')[0]).toStrictEqual([portalImage])
    })
    it('@drop - is triggered when DraggableItem emits drop', async () => {
      const draggableItem = wrapper.findComponent(DraggableItem)
      await draggableItem.vm.$emit('drop')

      expect(wrapper.emitted('drop').length).toBe(1)
    })
    it('@drag - is triggered when DraggableItem emits drag', async () => {
      const draggableItem = wrapper.findComponent(DraggableItem)
      await draggableItem.vm.$emit('drag')

      expect(wrapper.emitted('drag').length).toBe(1)
    })
  })
})
