import { shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import type { defineComponent } from 'vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { GalleryForm } from '@core/models/image/galleryForm'
import { ImageForm } from '@core/models/image/imageForm'
import ImageAddCard from '@core/components/inputs/image/ImageAddCard/ImageAddCard.vue'
import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import GalleryInput from '@core/components/inputs/image/GalleryInput/GalleryInput.vue'
import ImageEditCard from '@core/components/inputs/image/ImageEditCard/ImageEditCard.vue'

describe('GalleryInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(GalleryInput, {
      props: {
        gallery: new GalleryForm(),
        imageConstraints: new ImageConstraints(undefined, '4/3')
      },
      global: {
        stubs: {
          ImageDropArea: {
            template: '<div><slot></slot></div>'
          }
        }
      }
    })
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    it(':value - renders ImageEditCard for each image in gallery', async () => {
      const imageForm = new ImageForm()
      const gallery = new GalleryForm([imageForm, imageForm, imageForm])
      await wrapper.setProps({ gallery })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.length).toBe(3)
    })
    it(':value - applies image on ImageEditCard', async () => {
      const imageForm = new ImageForm()
      const gallery = new GalleryForm([imageForm, imageForm, imageForm])
      await wrapper.setProps({ gallery })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.at(0).props().image).toStrictEqual(imageForm)
    })
    it(':imageConstraints - are applied to each ImageEditCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      const imageForm = new ImageForm()
      const gallery = new GalleryForm([imageForm])
      await wrapper.setProps({ gallery })
      await wrapper.setProps({
        gallery,
        imageConstraints
      })

      const imageCards = wrapper.findAllComponents(ImageEditCard)
      expect(imageCards.at(0).props().imageConstraints).toStrictEqual(imageConstraints)
    })
    it(':imageConstraints - acceptedMimeTypes is applied to ImageAddCard', async () => {
      const imageConstraints = new ImageConstraints(['image/png', 'image/jpg'], '16/9')
      await wrapper.setProps({ imageConstraints })

      const imageAddCard = wrapper.findComponent(ImageAddCard)
      expect(imageAddCard.props().acceptedMimeTypes).toStrictEqual(imageConstraints.mimeTypes)
    })
  })
  describe('@events', () => {
    it(':update:gallery - is triggered when ImageDropArea emits input', async () => {
      const gallery = new GalleryForm([new ImageForm(0)])
      await wrapper.setProps({ gallery })
      const imageForm = new ImageForm(1)

      const imageDropArea = wrapper.findComponent(ImageDropArea)
      await imageDropArea.vm.$emit('new-image', imageForm)

      expect(wrapper.emitted('update:gallery')[0]).toStrictEqual([
        new GalleryForm([new ImageForm(0), imageForm])
      ])
    })
    it(':update:gallery - is triggered when ImageAddCard emits input', async () => {
      const gallery = new GalleryForm([new ImageForm(0)])
      await wrapper.setProps({ gallery })
      const imageForm = new ImageForm(1)

      const imageAddCard = wrapper.findComponent(ImageAddCard)
      await imageAddCard.vm.$emit('new-image', imageForm)

      expect(wrapper.emitted('update:gallery')[0]).toStrictEqual([
        new GalleryForm([new ImageForm(0), imageForm])
      ])
    })
    it(':update:gallery - is triggered when ImageDropArea emits input', async () => {
      const gallery = new GalleryForm([new ImageForm(0)])
      await wrapper.setProps({ gallery })
      const imageForm = new ImageForm(1)

      const imageAddCard = wrapper.findComponent(ImageDropArea)
      await imageAddCard.vm.$emit('new-image', imageForm)

      expect(wrapper.emitted('update:gallery')[0]).toStrictEqual([
        new GalleryForm([new ImageForm(0), imageForm])
      ])
    })
  })
})
