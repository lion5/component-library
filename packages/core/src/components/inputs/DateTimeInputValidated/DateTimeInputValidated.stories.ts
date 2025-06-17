import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import DateTimeInput from './DateTimeInputValidated.vue'
import { useDate } from '@core/composables/useDate'
import { date } from 'yup'

export default {
  component: DateTimeInput,
  title: 'Input Components/DateTimeInputValidated'
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
        <DateTimeInput v-bind="args" />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'date-input2'
  }
}

export const Required: Story = {
  args: {
    name: 'date-input-required',
    label: 'This is an required date field',
    validationRules: date().required()
  }
}