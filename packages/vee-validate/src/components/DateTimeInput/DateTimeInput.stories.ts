import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import DateTimeInput from './DateTimeInput.vue'
import { useDate } from '../../../composables'

export default {
  component: DateTimeInput
} as Meta<typeof DateTimeInput>
type Story = StoryObj<typeof DateTimeInput>

export const Empty: Story = {
  args: {
    name: 'date-input1',
    label: 'This is an example date field'
  }
}

export const Filled: Story = {
  render: (args: unknown) => ({
    components: { DateTimeInput, Form },
    setup() {
      const { getDateTimeLocalInputValue } = useDate()
      return { args, getDateTimeLocalInputValue }
    },
    template: `
      <Form :initialValues='{"date-input2": getDateTimeLocalInputValue(new Date())}'>
      <DateTimeInput v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'date-input2'
  }
}
