import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import AddressInput from './AddressInput.vue'
import { action } from '@storybook/addon-actions'

export default {
  component: AddressInput
} as Meta<typeof AddressInput>
type Story = StoryObj<typeof AddressInput>

export const Empty: Story = {
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { AddressInput, Form },
    setup() {
      const onSubmit = action('submit')
      return { args, onSubmit }
    },
    template: `
      <Form @submit="onSubmit" :initialValues='{input1: "Text Input"}'>
        <AddressInput v-bind='args' />
        <button type='submit'>Submit</button>
      </Form>`
  }),
  args: {
    name: 'address',
    validationRules: 'required'
  }
}

export const Error: Story = {
  render: (args: unknown) => ({
    components: { AddressInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "DEABCDEFG"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='false'
            :initialErrors='{"input-with-error": "This is an error"}'>
      <AddressInput v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}
