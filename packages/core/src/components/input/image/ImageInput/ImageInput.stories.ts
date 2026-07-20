import { Meta, StoryObj } from '@storybook/vue3-vite'
import ImageInput from './ImageInput.vue'
import { ref } from 'vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ImageSizes } from '../../../../models'
import { action } from 'storybook/actions'

export default {
  component: ImageInput,
  title: 'Input Components/ImageInput',
  render: (args) => ({
    components: { ImageInput },
    setup() {
      const imageForm = ref<ImageForm>(args.modelValue)
      const onInput = action('updated:modelValue')
      return { args, imageForm, onInput }
    },
    template: `
      <ImageInput v-bind="args" v-model="imageForm" @update:model-value="onInput" />
      <p>Selected Image: {{ imageForm }}</p>
    `
  })
} as Meta<typeof ImageInput>
type Story = StoryObj<typeof ImageInput>

export const Empty: Story = {
  args: {
    name: 'image-input-empty',
    label: 'Empty File Input'
  }
}

export const Filled: Story = {
  args: {
    name: 'image-input-filled',
    label: 'Filled File Input',
    modelValue: new ImageForm(
      undefined,
      undefined,
      new File(['Some content'], 'test.txt'),
      undefined,
      new ImageSizes('https://dummyimage.com/800x400/d4d4d4/fff.png'),
      false,
      false,
      []
    )
  }
}

export const WithError: Story = {
  args: {
    name: 'image-input-error',
    label: 'Error File Input',
    modelValue: new ImageForm(
      undefined,
      undefined,
      new File(['Some content'], 'test.txt'),
      undefined,
      new ImageSizes('https://dummyimage.com/800x400/d4d4d4/fff.png'),
      false,
      false,
      [new Error('This file is not valid')]
    ),
    invalid: true
  }
}

export const Required: Story = {
  args: {
    name: 'image-input-required',
    label: 'Required File Input',
    required: true
  }
}

export const Disabled: Story = {
  args: {
    name: 'image-input-disabled',
    label: 'Disabled File Input',
    disabled: true
  }
}

export const RestrictedFileTypeInput: Story = {
  args: {
    name: 'image-input-restricted-file-types',
    label: 'Restricted File Types Input',
    accept: 'image/png'
  }
}
