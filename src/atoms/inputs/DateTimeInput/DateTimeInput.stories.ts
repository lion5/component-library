import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import DateTimeInput from './DateTimeInput.vue'

export default {
  component: DateTimeInput
} as Meta<typeof DateTimeInput>
type Story = StoryObj<typeof DateTimeInput>

export const Empty: Story = {
  args: {
    name: 'date-input1',
    label: 'This is an example checkbox'
  }
}

export const Checked: Story = {
  render: (args) => ({
    components: { DateTimeInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{checkbox2: true}'>
      <DateTimeInput v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'date-input1'
  }
}
