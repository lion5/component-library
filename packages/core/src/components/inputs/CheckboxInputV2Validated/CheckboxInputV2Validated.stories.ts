import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import CheckboxInputV2 from './CheckboxInputV2Validated.vue'
import { boolean } from 'yup'

export default {
  component: CheckboxInputV2,
  title: 'Input Components/CheckboxInputValidated'
} as Meta<typeof CheckboxInputV2>
type Story = StoryObj<typeof CheckboxInputV2>

export const Unchecked: Story = {
  args: {
    name: 'test-empty',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label'
  }
}

export const UncheckedWithLabelOnly: Story = {
  args: {
    name: 'test-empty',
    label: 'This is a checkbox'
  }
}

export const Checked: Story = {
  render: (args: unknown) => ({
    components: { CheckboxInputV2, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: true}'>
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

export const Required: Story = {
  args: {
    name: 'test-required',
    label: 'This is a required checkbox',
    labelSmall: 'This is a small label',
    validationRules: boolean().required()
  }
}