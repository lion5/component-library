import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import CodeInput from './CodeInput.vue'

/**
 * The CodeInput component is used to input a Code. The inserted value only allows numbers and chars.
 **/

export default {
  component: CodeInput
} as Meta<typeof CodeInput>
type Story = StoryObj<typeof CodeInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { CodeInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: "ABCD1234" }'>
        <CodeInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1'
  }
}

export const FilledWithLabel: Story = {
  render: (args: unknown) => ({
    components: { CodeInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: "ABCD1234" }'>
        <CodeInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    label: 'Code'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { CodeInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "§$%&"}'
            :initialTouched='{"input-with-error": true}'
            :initialErrors='{"input-with-error": "Dieser Code ist ungültig."}'
      >
        <CodeInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}
