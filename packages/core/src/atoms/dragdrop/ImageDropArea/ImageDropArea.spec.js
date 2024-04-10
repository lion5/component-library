import { mount } from '@vue/test-utils'
import { PortalImage } from '@/base/models/image'
import flushPromises from 'flush-promises'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import ImageDropArea from '@core/atoms/dragdrop/ImageDropArea/ImageDropArea.vue'

describe('ImageDropArea', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ImageDropArea)
  })
  afterEach(() => {
    wrapper.destroy()
  })
  describe(':props', () => {
    it(':disable - dragOver, dragLeave and drop events are listened when set to false', async () => {
      wrapper.vm.setDraggedOver = vi.fn()
      wrapper.vm.onDrop = vi.fn()

      await wrapper.setProps({ disable: false })
      await wrapper.setData({ draggedOver: true })

      const fileDropArea = await wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')
      await fileDropArea.trigger('drop')

      const overlay = await wrapper.find('.overlay')
      await overlay.trigger('dragleave')
      expect(wrapper.vm.setDraggedOver).toHaveBeenCalledTimes(2)
      expect(wrapper.vm.onDrop).toHaveBeenCalledTimes(1)
    })
    it(':disable - dragOver, dragLeave and drop events are not listened when set to true', async () => {
      wrapper.vm.setDraggedOver = vi.fn()
      wrapper.vm.onDrop = vi.fn()

      await wrapper.setProps({ disable: true })
      await wrapper.setData({ draggedOver: true })

      const fileDropArea = await wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')
      await fileDropArea.trigger('drop')

      const overlay = await wrapper.find('.overlay')
      await overlay.trigger('dragleave')
      expect(wrapper.vm.setDraggedOver).toHaveBeenCalledTimes(0)
      expect(wrapper.vm.onDrop).toHaveBeenCalledTimes(0)
    })
    it(':dropInfo - is displayed on dragOver', async () => {
      const dropInfo = 'My Custom Drop Note'
      await wrapper.setProps({ dropInfo })
      await wrapper.setData({ draggedOver: true })

      expect(wrapper.find('.overlay .text').text()).toBe(dropInfo)
    })
  })
  describe('@events', () => {
    it('input - is triggered only once on drop', async () => {
      const portalImage = new PortalImage(4711)
      vi.spyOn(PortalImage, 'fromFile').mockResolvedValueOnce(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: new Date()
      })

      const dropArea = wrapper.find('.file-drop-area')
      await dropArea.trigger('drop', {
        dataTransfer: { files: [file, file, file] }
      })
      await flushPromises()

      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
    it('input - is triggered multiple times on drop when multiselect is set to true', async () => {
      await wrapper.setProps({ multiselect: true })

      const portalImage = new PortalImage(4711)
      vi.spyOn(PortalImage, 'fromFile').mockResolvedValue(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: new Date()
      })

      const dropArea = wrapper.find('.file-drop-area')
      await dropArea.trigger('drop', {
        dataTransfer: { files: [file, file, file] }
      })
      await flushPromises()

      expect(wrapper.emitted('input').length).toBe(3)
      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
  })
  describe('Component', () => {
    it('dragged-over class is removed as default', async () => {
      const fileDropArea = wrapper.find('.file-drop-area')
      expect(fileDropArea.classes('dragged-over')).toBeFalsy()
    })
    it('dragged-over class is added on @dragover', async () => {
      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')

      expect(fileDropArea.classes('dragged-over')).toBeTruthy()
    })
    it('dragged-over class is removed on @dragleave', async () => {
      await wrapper.setData({ draggedOver: true })

      const overlay = wrapper.find('.overlay')
      await overlay.trigger('dragleave')

      const fileDropArea = wrapper.find('.file-drop-area')
      expect(fileDropArea.classes('dragged-over')).toBeFalsy()
    })
    it('dragged-over class is removed on @drop', async () => {
      await wrapper.setData({ draggedOver: true })

      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('drop', { dataTransfer: { files: [] } })

      expect(fileDropArea.classes('dragged-over')).toBeFalsy()
    })
  })
})
