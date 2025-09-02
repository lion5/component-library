import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { defineComponent, nextTick } from 'vue'
import FileInputValidated from '@core/components/inputs/FileInputValidated/FileInputValidated.vue'
import FileInput from '@core/components/inputs/FileInput/FileInput.vue'

describe('FileInputValidated.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(FileInputValidated, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name, :label, :accept, :multiple, :disabled, :dropInfo  - are applied to input', async () => {
      const expectedName = 'expectedFieldName'
      const expectedLabel = 'Expected Label'
      const expectedAccept = 'expectedAccept'
      const expectedDropInfo = 'Expected Drop Info'
      await wrapper.setProps({
        name: expectedName,
        label: expectedLabel,
        accept: expectedAccept,
        multiple: true,
        dropInfo: expectedDropInfo
      })

      expect(wrapper.findComponent(FileInput).props().name).toBe(expectedName)
      expect(wrapper.findComponent(FileInput).props().label).toBe(expectedLabel)
      expect(wrapper.findComponent(FileInput).props().accept).toBe(expectedAccept)
      expect(wrapper.findComponent(FileInput).props().multiple).toBe(true)
      expect(wrapper.findComponent(FileInput).props().dropInfo).toBe(expectedDropInfo)
    })
  })

  describe('@events', () => {
    it('@update:modelValue - emits updated input value', async () => {
      const expectedValue = [
        new File([''], 'test', { type: 'image/jpg', lastModified: Date.now() })
      ]
      const input = wrapper.findComponent(FileInput)
      input.vm.$emit('update:modelValue', expectedValue)
      await nextTick()

      expect(wrapper.emitted('update:modelValue')?.length).toBe(1)
      expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([expectedValue])
    })
  })
})
