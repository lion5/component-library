import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import EuroInput from './EuroInputValidated.vue'
import { number } from 'yup'

/**
 * The CurrencyInput component is used to input a cent amount. The inserted value is formatted as euros.
 *
 * The design files can be found in [figma](https://www.figma.com/file/t7Sf0lcqLOFsWf9IfczzDf/Bamberg-Gutschein?type=design&node-id=2215%3A9872&mode=design&t=HMv5F0wNEzgDKZeY-1)
 */

export default {
  component: EuroInput,
  title: 'Input Components/EuroInputValidated'
} as Meta<typeof EuroInput>
type Story = StoryObj<typeof EuroInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { EuroCurrencyInput: EuroInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: 50 }'>
        <EuroCurrencyInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { EuroCurrencyInput: EuroInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": -100}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='true'
            :initialErrors='{"input-with-error": "This is an error"}'
      >
        <EuroCurrencyInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}

export const Required: Story = {
  args: {
    name: 'test-required',
    validationRules: number().required()
  }
}
