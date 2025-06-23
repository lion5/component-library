import { Meta, StoryObj } from '@storybook/vue3-vite'
import FileInput from './FileInput.vue'
import { ref } from 'vue'

export default {
  component: FileInput,
  title: 'Input Components/FileInput',
  render: (args) => ({
    components: { FileInput },
    setup() {
      const files = ref<File[]>(args.modelValue || [])
      return { args, files }
    },
    template: `
      <FileInput v-bind="args" v-model="files" />
      <p>Selected Files: {{ files }}</p>
    `
  })
} as Meta<typeof FileInput>
type Story = StoryObj<typeof FileInput>

export const Empty: Story = {
  args: {
    name: 'file-input-empty',
    label: 'Empty File Input',
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
    modelValue: [new File(['Some content'], 'test.txt')],
    invalid: true,
    errors: [new Error('This file is not valid')]
  }
}

export const Required: Story = {
  args: {
    name: 'file-input-required',
    label: 'Required File Input',
    required: true
  }
}

export const Disabled: Story = {
  args: {
    name: 'file-input-disabled',
    label: 'Disabled File Input',
    disabled: true
  }
}

export const MultifileInput: Story = {
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
