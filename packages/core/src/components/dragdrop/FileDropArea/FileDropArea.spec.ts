import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { defineComponent } from 'vue'
import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'

describe('FileDropArea.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(FileDropArea)
  })

  describe(':props', () => {
    it(':disabled - dragOver, dragLeave and drop events are listened when set to false', async () => {
      await wrapper.setProps({ disabled: false })
      const fileDropArea = wrapper.find('.file-drop-area')
      await fileDropArea.trigger('dragover')
      const overlay = await wrapper.find('.overlay')
      await overlay.trigger('dragleave')
      await fileDropArea.trigger('drop')

      expect(wrapper.emitted('dragover').length).toBe(1)
      expect(wrapper.emitted('drop').length).toBe(1)
      expect(wrapper.emitted('dragleave').length).toBe(1)
    })
    it(':disabled - dragOver, dragLeave and drop events are not listened when set to true', async () => {
      wrapper.vm.setDraggedOver = vi.fn()
      wrapper.vm.onDrop = vi.fn()

      await wrapper.setProps({ disabled: true })

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
      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
      })

      const dropArea = wrapper.find('.file-drop-area')
      await dropArea.trigger('drop', {
        dataTransfer: { files: [file, file, file] }
      })
      await flushPromises()

      expect(wrapper.emitted('new-file').length).toBe(1)
      expect(wrapper.emitted('new-file')[0]).toStrictEqual([file])
    })
    it('input - is triggered multiple times on drop when multiselect is set to true', async () => {
      await wrapper.setProps({ multiselect: true })

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
      })

      const dropArea = wrapper.find('.file-drop-area')
      await dropArea.trigger('drop', {
        dataTransfer: { files: [file, file, file] }
      })
      await flushPromises()

      expect(wrapper.emitted('new-file').length).toBe(3)
      expect(wrapper.emitted('new-file')[0]).toStrictEqual([file])
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
