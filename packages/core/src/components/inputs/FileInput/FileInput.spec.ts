import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import type { defineComponent } from 'vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import FileInput from '@core/components/inputs/FileInput/FileInput.vue'
import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'
import PillListInput from '@core/components/inputs/ListInputValidated/PillListInput.vue'
import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'

describe('FileInput.vue', () => {
  let wrapper: ReturnType<typeof defineComponent>

  beforeEach(() => {
    wrapper = mount(FileInput, {
      props: {
        name: 'name',
        label: 'label'
      }
    })
  })
  describe(':props', () => {
    it(':name - is applied to input', async () => {
      const expectedName = 'expectedFieldName'
      await wrapper.setProps({ name: expectedName })

      expect(wrapper.find('input').attributes('name')).toBe(expectedName)
    })
    it(':label - is rendered as label', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })

      expect(wrapper.find('label').text()).toBe(expectedLabel)
    })
    it(':error - is applied to ErrorMessage', async () => {
      const expectedError = new Error('Expected Error')
      await wrapper.setProps({ name: 'test', errors: [expectedError], invalid: true })

      expect(wrapper.findComponent(ErrorBox).vm.errors).toStrictEqual([expectedError])
    })
    it(':dirty, :invalid, :required, :disabled - is rendered as label', async () => {
      await wrapper.setProps({ dirty: true, invalid: true, required: true, disabled: true })

      expect(wrapper.findComponent(FileDropArea).classes()).toContain('dirty')
      expect(wrapper.findComponent(FileDropArea).classes()).toContain('invalid')
      expect(wrapper.findComponent(FileDropArea).classes()).toContain('required')
      expect(wrapper.findComponent(FileDropArea).classes()).toContain('disabled')
    })
    it(':required - renders asterix', async () => {
      await wrapper.setProps({ required: true })

      expect(wrapper.find('.required-identification').text()).toBe('*')
    })
    it(':errors - renders error box', async () => {
      const expectedError = new Error('Test Error')
      await wrapper.setProps({ errors: [expectedError], invalid: true })

      expect(wrapper.findComponent(ErrorBox).props().errors).toStrictEqual([expectedError])
    })
    it(':accept - applied to input', async () => {
      const expectedAccept = 'text/plain'
      await wrapper.setProps({ accept: expectedAccept })

      expect(wrapper.find('input').attributes('accept')).toBe(expectedAccept)
    })
    it(':multiple - applied to input and DropArea', async () => {
      await wrapper.setProps({ multiple: true })

      expect(wrapper.find('input').attributes('multiple')).toBeDefined()
      expect(wrapper.findComponent(FileDropArea).props().multiselect).toBe(true)
    })
    it(':disabled - applied to input and DropArea', async () => {
      await wrapper.setProps({ disabled: true })

      expect(wrapper.find('input').attributes('disabled')).toBeDefined()
      expect(wrapper.findComponent(FileDropArea).props().disabled).toBe(true)
    })
    it(':dropInfo - applied to DropArea', async () => {
      const expectedDropInfo = 'Expected Drop Info'
      await wrapper.setProps({ label: 'test label', dropInfo: expectedDropInfo })

      expect(wrapper.findComponent(FileDropArea).props().dropInfo).toBe(expectedDropInfo)
    })
    it(':dropInfo - uses label if not set', async () => {
      const expectedLabel = 'Expected Label'
      await wrapper.setProps({ label: expectedLabel })

      expect(wrapper.findComponent(FileDropArea).props().dropInfo).toBe(expectedLabel)
    })
    it(':modelValue - renders as pills', async () => {
      const files = [
        new File(['Test File 1'], 'file_1', { type: 'text/plain', lastModified: Date.now() }),
        new File(['Test File 2'], 'file_2', { type: 'text/plain', lastModified: Date.now() })
      ]
      const expectedPills = [
        new PillInputItem('file_1', 'file_1', false),
        new PillInputItem('file_2', 'file_2', false)
      ]
      await wrapper.setProps({ modelValue: files })

      expect(wrapper.findComponent(PillListInput).props().pillInputItems).toStrictEqual(
        expectedPills
      )
    })
  })

  describe('@events', () => {
    it('@update:modelValue - emitted on @new-files event from FileDropArea', async () => {
      const files = [
        new File(['Test File 1'], 'file_1', { type: 'text/plain', lastModified: Date.now() }),
        new File(['Test File 2'], 'file_2', { type: 'text/plain', lastModified: Date.now() })
      ]
      await wrapper.findComponent(FileDropArea).vm.$emit('new-files', files)

      expect(wrapper.emitted('update:modelValue')).toStrictEqual([[files]])
    })
    // TODO: Found no solution with jsdom
    it.skip('@update:modelValue - emitted on @change event from input', async () => {
      const files = [
        new File(['Test File 1'], 'file_1', { type: 'text/plain', lastModified: Date.now() }),
        new File(['Test File 2'], 'file_2', { type: 'text/plain', lastModified: Date.now() })
      ]
      const input = wrapper.find('input')
      const dataTransfer = new DataTransfer()
      files.forEach((file) => dataTransfer.items.add(file))
      input.element.files = dataTransfer.files
      await input.trigger('change')

      expect(wrapper.emitted('update:modelValue')).toStrictEqual([[files]])
    })
    it('@update:modelValue - emitted on @delete event from PillListInput', async () => {
      const files = [
        new File(['Test File 1'], 'file_1', { type: 'text/plain', lastModified: Date.now() }),
        new File(['Test File 2'], 'file_2', { type: 'text/plain', lastModified: Date.now() })
      ]
      await wrapper.setProps({ modelValue: files })

      await wrapper.findComponent(PillListInput).vm.$emit('delete', files[0].name)

      expect(wrapper.emitted('update:modelValue')).toStrictEqual([[files.slice(1)]])
    })
  })
})
