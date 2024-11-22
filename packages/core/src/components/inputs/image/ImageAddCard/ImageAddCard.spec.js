import '@/configuration/validation'
import { createLocalVue, mount } from '@vue/test-utils'
import BootstrapVue, { BootstrapVueIcons } from 'bootstrap-vue'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import { PortalImage } from '@/base/models/image'
import flushPromises from 'flush-promises'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const localVue = createLocalVue()
localVue.use(BootstrapVue)
localVue.use(BootstrapVueIcons)

describe('ImageAddCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(ImageAddCard, { localVue })
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':multiselect - is applied to input', async () => {
      const multiselect = true
      await wrapper.setProps({ multiselect })

      const input = wrapper.find('input')
      expect(input.attributes('multiple')).toBe('multiple')
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
        lastModified: new Date()
      })
      const portalImage = new PortalImage(4711)

      vi.spyOn(PortalImage, 'fromFile').mockResolvedValue(portalImage)
      wrapper.vm.getFiles = vi.fn().mockReturnValueOnce([file, file, file])

      const input = wrapper.find('input')
      await input.trigger('change')
      await flushPromises()

      expect(wrapper.emitted('input').length).toBe(3)
      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
      expect(wrapper.emitted('input')[1]).toStrictEqual([portalImage])
      expect(wrapper.emitted('input')[2]).toStrictEqual([portalImage])
    })
  })
})
