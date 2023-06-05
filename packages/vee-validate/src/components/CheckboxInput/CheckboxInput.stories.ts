import { Meta, StoryObj } from '@storybook/vue3'
import CheckboxInput from './CheckboxInput.vue'
import { Form } from 'vee-validate'

export default {
  component: CheckboxInput
} as Meta<typeof CheckboxInput>
type Story = StoryObj<typeof CheckboxInput>

export const Empty: Story = {
  args: {
    name: 'checkbox1',
    label: 'This is an example checkbox'
  }
}

export const Checked: Story = {
  render: (args) => ({
    components: { CheckboxInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{checkbox2: true}'>
      <CheckboxInput v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'checkbox2'
  }
}
