import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import NumberInput from './NumberInputValidated.vue'

export default {
  component: NumberInput
} as Meta<typeof NumberInput>
type Story = StoryObj<typeof NumberInput>

export const Empty: Story = {
  args: {
    name: 'number-input1',
    label: 'This is an example date field'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { NumberInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"number-input2": 14.45}'>
      <NumberInput v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'number-input2'
  }
}
