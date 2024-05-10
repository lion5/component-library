import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import IbanInput from './IbanInput.vue'
import CheckboxInputV2 from './CheckboxInputV2.vue'

export default {
  component: CheckboxInputV2
} as Meta<typeof CheckboxInputV2>
type Story = StoryObj<typeof CheckboxInputV2>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label'
  }
}

export const Checked: Story = {
  render: (args: unknown) => ({
    components: { CheckboxInputV2, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: "Text Input"}'>
        <CheckboxInputV2 v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input1',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label',
    modelValue: true
  }
}

export const Error: Story = {
  render: (args: unknown) => ({
    components: { CheckboxInputV2, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "DEABCDEFG"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='false'
            :initialErrors='{"input-with-error": "This is an error"}'>
        <CheckboxInputV2 v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label'
  }
}
