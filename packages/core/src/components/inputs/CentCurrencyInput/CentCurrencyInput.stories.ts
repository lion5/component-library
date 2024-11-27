import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import CentCurrencyInput from './CentCurrencyInput.vue'

/**
 * The CentCurrencyInput component is used to input a cent amount. The inserted value is formatted as euros.
 *
 * The design files can be found in [figma](https://www.figma.com/file/t7Sf0lcqLOFsWf9IfczzDf/Bamberg-Gutschein?type=design&node-id=2215%3A9872&mode=design&t=HMv5F0wNEzgDKZeY-1)
 */

export default {
  component: CentCurrencyInput
} as Meta<typeof CentCurrencyInput>
type Story = StoryObj<typeof CentCurrencyInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { CurrencyInput: CentCurrencyInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: 234 }'>
        <CurrencyInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { CurrencyInput: CentCurrencyInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": -100}'
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
