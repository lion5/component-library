import { flushPromises, shallowMount } from '@vue/test-utils'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import type { defineComponent } from 'vue'
import { ImageForm } from '@core/models/image/imageForm'
import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'

describe('ImageDropArea.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = shallowMount(ImageDropArea)
  })
  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    it(':disabled, :dropInfo, :multiselect - passed to FileDropArea', async () => {
      await wrapper.setProps({ disabled: true, dropInfo: 'Drop Info', multiselect: true })

      expect(wrapper.getComponent(FileDropArea).disabled).toBe(true)
      expect(wrapper.getComponent(FileDropArea).dropInfo).toBe('Drop Info')
      expect(wrapper.getComponent(FileDropArea).multiselect).toBe(true)
    })
  })
  describe('@events', () => {
    it('@input - is triggered on @new-file by FileDropArea', async () => {
      const portalImage = new ImageForm(4711)
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValueOnce(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
      })

      const dropArea = wrapper.getComponent(FileDropArea)
      await dropArea.vm.$emit('new-file', file)
      await flushPromises()

      expect(wrapper.emitted('input').length).toBe(1)
      expect(wrapper.emitted('input')[0]).toStrictEqual([portalImage])
    })
    it('@new-image - is triggered on @new-file by FileDropArea', async () => {
      const portalImage = new ImageForm(4711)
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValueOnce(portalImage)

      const file = new File([''], 'test', {
        type: 'image/jpg',
        lastModified: Date.now()
      })

      const dropArea = wrapper.getComponent(FileDropArea)
      await dropArea.vm.$emit('new-file', file)
      await flushPromises()

      expect(wrapper.emitted('new-image').length).toBe(1)
      expect(wrapper.emitted('new-image')[0]).toStrictEqual([portalImage])
    })
  })
})
