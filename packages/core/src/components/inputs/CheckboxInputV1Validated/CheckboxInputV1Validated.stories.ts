import { Meta, StoryObj } from '@storybook/vue3-vite'
import CheckboxInput from './CheckboxInputV1Validated.vue'
import { Form } from 'vee-validate'

export default {
  component: CheckboxInput,
  tags: ['!dev', '!autodocs']
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
