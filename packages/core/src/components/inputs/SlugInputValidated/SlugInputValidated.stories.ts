import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import SlugInput from './SlugInputValidated.vue'
import { string } from 'yup'

/**
 * The SlugInput component is used to insert slugs or paths for urls.
 */

export default {
  component: SlugInput,
  title: 'Input Components/SlugInputValidated'
} as Meta<typeof SlugInput>
type Story = StoryObj<typeof SlugInput>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    prefix: 'Prefix'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { SlugInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: 234 }'>
        <SlugInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    prefix: 'Prefix'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { SlugInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": -100}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='true'
            :initialErrors='{"input-with-error": "This is an error"}'
      >
        <SlugInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    prefix: 'Prefix'
  }
}

export const Required: Story = {
  args: {
    name: 'test-required',
    prefix: 'Prefix',
    validationRules: string().required()
  }
}