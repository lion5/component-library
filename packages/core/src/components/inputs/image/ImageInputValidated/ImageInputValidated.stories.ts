import { Meta, StoryObj } from '@storybook/vue3-vite'
import ImageInputValidated from './ImageInputValidated.vue'
import { ref } from 'vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ImageSizes } from '../../../../models'
import { formWrapper } from '../../../../../.storybook/decorators'
import { ImageConstraints } from '../../../../models/image/imageConstraints'
import { object } from 'yup'

export default {
  component: ImageInputValidated,
  title: 'Input Components/ImageInputValidated',
  decorators: [formWrapper],
  render: (args) => ({
    components: { ImageInputValidated },
    setup() {
      const imageForm = ref<ImageForm>(args.modelValue)
      return { args, imageForm }
    },
    template: `
      <ImageInputValidated v-bind="args" v-model="imageForm" />
      <p>Selected Image: {{ imageForm }}</p>
    `
  })
} as Meta<typeof ImageInputValidated>
type Story = StoryObj<typeof ImageInputValidated>

export const Empty: Story = {
  args: {
    name: 'image-input-empty',
    label: 'Empty File Input',
    constraints: new ImageConstraints()
  }
}

export const Filled: Story = {
  args: {
    name: 'image-input-filled',
    label: 'Filled File Input',
    modelValue:
      new ImageForm(
        undefined,
        undefined,
        new File(['Some content'], 'test.txt'),
        undefined,
        new ImageSizes('https://dummyimage.com/800x400/d4d4d4/fff.png'),
        false,
        false,
        []
      ),
    constraints: new ImageConstraints()
  }
}

export const WithError: Story = {
  args: {
    name: 'image-input-error',
    label: 'Error File Input',
    modelValue:
      new ImageForm(
        undefined,
        undefined,
        new File(['Some content'], 'test.txt', { type: 'text/html' }),
        new Image(100, 100),
        new ImageSizes('https://dummyimage.com/800x400/d4d4d4/fff.png'),
        false,
        false,
        []
      ),
    constraints: new ImageConstraints(['test'], '12', 1, 1, 3),
    initialTouched: { 'image-input-error': true },
    validateOnMount: true
  }
}

export const Required: Story = {
  args: {
    name: 'image-input-required',
    label: 'Required File Input',
    validationRules: object().required()
  }
}

export const Disabled: Story = {
  args: {
    name: 'image-input-disabled',
    label: 'Disabled File Input',
    disabled: true
  }
}
