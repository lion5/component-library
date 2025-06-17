import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import { boolean } from 'yup'
import RadioInputValidated from './RadioInputValidated.vue'

export default {
  component: RadioInputValidated,
  title: 'Input Components/RadioInputValidated'
} as Meta<typeof RadioInputValidated>
type Story = StoryObj<typeof RadioInputValidated>

export const Unchecked: Story = {
  args: {
    name: 'test-empty',
    label: 'This is a radio input',
    labelDescription: 'This is a label description'
  }
}

export const UncheckedWithLabelOnly: Story = {
  args: {
    name: 'test-empty',
    label: 'This is a radio input'
  }
}

export const Checked: Story = {
  render: (args: unknown) => ({
    components: { RadioInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: true}'>
        <RadioInputValidated v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    label: 'This is a radio input',
    labelDescription: 'This is a label description with a very long text that should be wrapped. It should be seriously long to get wrapped. So let\'s add some more text to make it even longer. This is a label description with a very long text that should be wrapped. It should be seriously long to get wrapped. So let\'s add some more text to make it even longer.',
    modelValue: true
  }
}

export const Error: Story = {
  render: (args: unknown) => ({
    components: { RadioInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form
        :initialTouched='{"input-with-error": true}'
        :validateOnMount='false'
        :initialErrors='{"input-with-error": "This is an error"}'>
        <RadioInputValidated v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'This is a radio input',
    labelDescription: 'This is a label description',
    validationRules: boolean().isTrue()
  }
}

export const Required: Story = {
  args: {
    name: 'test-required',
    label: 'This is a required radio input',
    labelDescription: 'This is a label description',
    validationRules: boolean().required()
  }
}
