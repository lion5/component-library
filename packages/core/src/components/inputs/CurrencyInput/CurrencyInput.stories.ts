import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import CurrencyInput from './CurrencyInput.vue'

export default {
  component: CurrencyInput
} as Meta<typeof CurrencyInput>
type Story = StoryObj<typeof CurrencyInput>

export const TextInput: Story = {
  render: (args: unknown) => ({
    components: { CurrencyInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: "Text Input"}'>
        <CurrencyInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    label: 'Text Input',
    type: 'text'
  }
}

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { CurrencyInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "Some wrong text"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='true'
            :initialErrors='{"input-with-error": "This is an error"}'
      >
        <CurrencyInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}
