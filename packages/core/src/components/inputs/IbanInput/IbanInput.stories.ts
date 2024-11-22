import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import IbanInput from './IbanInput.vue'

export default {
  component: IbanInput
} as Meta<typeof IbanInput>
type Story = StoryObj<typeof IbanInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { IbanInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: "Text Input"}'>
      <IbanInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    iban: 'DE000000000000000000000'
  }
}

export const Error: Story = {
  render: (args: unknown) => ({
    components: { IbanInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "DEABCDEFG"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='false'
            :initialErrors='{"input-with-error": "This is an error"}'>
      <IbanInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}
