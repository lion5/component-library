import { mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { defineComponent } from 'vue'
import ImageAddCard from '@core/components/inputs/image/ImageAddCard/ImageAddCard.vue'
import { ImageForm } from '@core/models/image/imageForm'

describe('ImageAddCard', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageAddCard)
  })

  describe(':props', () => {
    it(':multiselect - is applied to input', async () => {
      const multiselect = true
      await wrapper.setProps({ multiselect })

      const input = wrapper.find('input')
      expect(input.attributes('multiple')).toBeDefined()
    })
    it(':acceptedMimeTypes - are applied to input', async () => {
      const acceptedMimeTypes = ['image/png', 'image/jpg']
      await wrapper.setProps({ acceptedMimeTypes })

      const input = wrapper.find('input')
      expect(input.attributes('accept')).toBe('image/png, image/jpg')
    })
  })
  describe('@events', () => {
    it(':input - is triggered for each selected file', async () => {
      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
      })
      const portalImage = new ImageForm(4711)
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValue(portalImage)
      const input = wrapper.find('input')
      Object.defineProperty(input.element, 'files', {
        value: [file, file, file],
      })

      await input.trigger('change')

      expect(wrapper.emitted('new-image')?.length).toBe(3)
      expect(wrapper.emitted('new-image')[0]).toStrictEqual([portalImage])
      expect(wrapper.emitted('new-image')[1]).toStrictEqual([portalImage])
      expect(wrapper.emitted('new-image')[2]).toStrictEqual([portalImage])
    })
  })
})
