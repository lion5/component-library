import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import CentInput from './CentInputValidated.vue'
import { number } from 'yup'
import { ref } from 'vue'

/**
 * The CentInput component is used to input a cent amount. The inserted value is formatted as euros.
 *
 * The design files can be found in [figma](https://www.figma.com/file/t7Sf0lcqLOFsWf9IfczzDf/Bamberg-Gutschein?type=design&node-id=2215%3A9872&mode=design&t=HMv5F0wNEzgDKZeY-1)
 */

export default {
  component: CentInput,
  title: 'Input Components/CentInputValidated'
} as Meta<typeof CentInput>
type Story = StoryObj<typeof CentInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { CentInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{ input1: 234 }'>
        <CentInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { CentInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": -100}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='true'
            :initialErrors='{"input-with-error": "This is an error"}'
      >
        <CentInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}

export const MaxInput: Story = {
  render: (args: unknown) => ({
    components: { CentInput, Form },
    setup() {
      const cents = ref(5001)
      return { args, cents }
    },
    template: `
      <Form :initialValues='{ "inputMaxValue": cents }'
            :initialTouched='{"inputMaxValue": true}'
            :validateOnMount='true'>
        <p>Cents: {{ cents }}</p>
        <CentInput v-bind='args' v-model:cents="cents" />
      </Form>`
  }),
  args: {
    name: 'inputMaxValue',
    validationRules: number().max(5000)
  }
}

export const Required: Story = {
  args: {
    name: 'test-empty',
    validationRules: number().required()
  }
}