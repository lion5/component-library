import { Meta, StoryObj } from '@storybook/vue3'
import FileInputValidated from './FileInputValidated.vue'
import { ref } from 'vue'
import { formWrapper } from '../../../../.storybook/decorators'
import { array } from 'yup'

export default {
  component: FileInputValidated,
  title: 'Input Components/FileInputValidated',
  decorators: [formWrapper],
  render: (args) => ({
    components: { FileInputValidated },
    setup() {
      const files = ref<File[]>(args.modelValue || [])
      return { args, files }
    },
    template: `
      <FileInputValidated v-bind="args" v-model="files" />
      <p>Selected Files: {{ files }}</p>
    `
  })
} as Meta<typeof FileInputValidated>
type Story = StoryObj<typeof FileInputValidated>

export const Empty: Story = {
  args: {
    name: 'file-input-empty',
    label: 'Empty File Input',
    validationRules: array()
  }
}

export const Filled: Story = {
  args: {
    name: 'file-input-filled',
    label: 'Filled File Input',
    modelValue: [new File(['Some content'], 'test.txt', { type: 'text/html' })]
  }
}

export const WithError: Story = {
  args: {
    name: 'file-input-error',
    label: 'Error File Input',
    validationRules: array().min(1),
    initialTouched: { 'file-input-error': true },
    validateOnMount: true
  }
}

export const Required: Story = {
  args: {
    name: 'file-input-required',
    label: 'Required File Input',
    validationRules: array().min(1)
  }
}

export const Disabled: Story = {
  args: {
    name: 'file-input-disabled',
    label: 'Disabled File Input',
    disabled: true
  }
}

export const MultipleFiles: Story = {
  args: {
    name: 'file-input-multiple',
    label: 'Multiple Files Input',
    multiple: true
  }
}

export const RestrictedFileTypeInput: Story = {
  args: {
    name: 'file-input-restricted-file-types',
    label: 'Restricted File Types Input',
    accept: 'image/png'
  }
}
