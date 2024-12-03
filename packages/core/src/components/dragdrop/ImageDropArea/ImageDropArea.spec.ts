import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest'
import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import type { defineComponent } from 'vue'
import { ImageForm } from '@core/models/image/imageForm'

describe('ImageDropArea.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageDropArea)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    it(':disable - dragOver, dragLeave and drop events are listened when set to false', async () => {
      await wrapper.setProps({ disable: false })
      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')
      const overlay = await wrapper.find('.overlay')
      await overlay.trigger('dragleave')
      await fileDropArea.trigger('drop')

      expect(wrapper.emitted('dragover').length).toBe(1)
      expect(wrapper.emitted('drop').length).toBe(1)
      expect(wrapper.emitted('dragleave').length).toBe(1)
    })
    it(':disable - dragOver, dragLeave and drop events are not listened when set to true', async () => {
      wrapper.vm.setDraggedOver = vi.fn()
      wrapper.vm.onDrop = vi.fn()

      await wrapper.setProps({ disable: true })

      const fileDropArea = await wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')
      await fileDropArea.trigger('drop')

      expect(wrapper.vm.setDraggedOver).toHaveBeenCalledTimes(0)
      expect(wrapper.vm.onDrop).toHaveBeenCalledTimes(0)
    })
    it(':dropInfo - is displayed on dragOver', async () => {
      const dropInfo = 'My Custom Drop Note'
      await wrapper.setProps({ dropInfo })
      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')

      expect(wrapper.find('.overlay .text').text()).toBe(dropInfo)
    })
  })
  describe('@events', () => {
    it('input - is triggered only once on drop', async () => {
      const portalImage = new ImageForm(4711)
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValueOnce(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
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

      const portalImage = new ImageForm(4711)
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValue(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
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
      await wrapper.find('.file-drop-area').trigger('dragover')

      const overlay = wrapper.find('.overlay')
      await overlay.trigger('dragleave')

      const fileDropArea = wrapper.find('.file-drop-area')
      expect(fileDropArea.classes('dragged-over')).toBeFalsy()
    })
    it('dragged-over class is removed on @drop', async () => {
      await wrapper.find('.file-drop-area').trigger('dragover')

      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('drop', { dataTransfer: { files: [] } })

      expect(fileDropArea.classes('dragged-over')).toBeFalsy()
    })
  })
})
