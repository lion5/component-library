import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import ImageInput from '@core/components/inputs/image/ImageInput/ImageInput.vue'
import FileInput from '@core/components/inputs/FileInput/FileInput.vue'
import { ImageForm } from '@core/models/image/imageForm'
import { ImageSizes } from '@core/models/image/imageSizes'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'

describe('ImageInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(ImageInput, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name, :label, :accept, :disabled, :dropInfo, :required, :invalid, :dirty, :errors  - are applied to FileInput', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedAccept = 'expectedAccept'
      const expectedDropInfo = 'Expected Drop Info'
      const expectedErrors = [new Error('Expected Drop Info')]

      await wrapper.setProps({
        name: expectedName,
        label: expectedLabel,
        accept: expectedAccept,
        disabled: true,
        required: true,
        invalid: true,
        dirty: true,
        errors: expectedErrors,
        dropInfo: expectedDropInfo
      })

      expect(wrapper.findComponent(FileInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(FileInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(FileInput).props().accept).toBe(expectedAccept)
      expect(wrapper.findComponent(FileInput).props().disabled).toBe(true)
      expect(wrapper.findComponent(FileInput).props().required).toBe(true)
      expect(wrapper.findComponent(FileInput).props().invalid).toBe(true)
      expect(wrapper.findComponent(FileInput).props().dirty).toBe(true)
      expect(wrapper.findComponent(FileInput).props().errors).toStrictEqual(expectedErrors)
      expect(wrapper.findComponent(FileInput).props().dropInfo).toBe(expectedDropInfo)
    })
    it(':disabled - preview is displayed if not set', async () => {
      await wrapper.setProps({ disabled: false })

      expect(wrapper.find('.preview').exists()).toBeTruthy()
    })
    it(':disabled - preview is hidden if set to true', async () => {
      await wrapper.setProps({ disabled: true })

      expect(wrapper.find('.preview').exists()).toBeFalsy()
    })
    it(':modelValue - is rendered  displayed', async () => {
      const expectedImage = new MinimalImage(
        -1,
        'test-alt-text',
        'https://dummyimage.com/800x400/d4d4d4/fff.png'
      )
      const expectedFiles = [new File(['Some content'], 'test.txt')]
      await wrapper.setProps({
        modelValue: new ImageForm(
          undefined,
          expectedImage.alt,
          expectedFiles[0],
          undefined,
          new ImageSizes(expectedImage.url),
          false,
          false,
          []
        )
      })

      expect(wrapper.findComponent(BaseImage).props().image).toStrictEqual(expectedImage)
      expect(wrapper.findComponent(FileInput).props().modelValue).toStrictEqual(expectedFiles)
    })
    it(':modelValue - default image is set if undefined', async () => {
      const expectedImage = new MinimalImage(
        -1,
        'Placeholder',
        `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2 1"%3E%3C/svg%3E`
      )

      expect(wrapper.findComponent(BaseImage).props().image).toStrictEqual(expectedImage)
    })
    it(':errors - error overlay renderd if not empty', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ modelValue: new ImageForm(
        undefined,
        undefined,
        new File(['Some content'], 'test.txt', { type: 'text/html' }),
        undefined,
        new ImageSizes('https://dummyimage.com/800x400/d4d4d4/fff.png'),
        false,
        false,
          [expectedError]
        ) })

      expect(wrapper.find('.error-overlay').exists()).toBeTruthy()
    })
  })

  describe('@events', () => {
    it('@update:modelValue - emitted on @update:modelValue event from FileInput', async () => {
      const files = [
        new File(['Test File 1'], 'file_1', { type: 'image/jpeg', lastModified: Date.now() }),
      ]
      const expectedImageForm = new ImageForm()
      vi.spyOn(ImageForm, 'fromFile').mockResolvedValueOnce(expectedImageForm)
      await wrapper.findComponent(FileInput).vm.$emit('update:modelValue', files)
      await wrapper.vm.$nextTick()

      expect(wrapper.emitted('update:modelValue')).toStrictEqual([[expectedImageForm]])
    })
  })
})
