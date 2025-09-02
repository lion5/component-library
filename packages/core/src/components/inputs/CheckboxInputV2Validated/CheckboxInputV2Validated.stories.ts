import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import CheckboxInputV2 from './CheckboxInputV2Validated.vue'
import { boolean } from 'yup'
import { formWrapper } from '../../../../.storybook/decorators'
import { action } from 'storybook/actions'

export default {
  component: CheckboxInputV2,
  title: 'Input Components/CheckboxInputValidated',
  decorators: [formWrapper],
  render: (args) => ({
    components: { CheckboxInputV2, Form },
    setup() {
      const onChange = action('change')
      return { args, onChange }
    },
    template: `
      <CheckboxInputV2 v-bind="args" @change="onChange" />`
  })
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
  args: {
    name: 'input1',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label',
    modelValue: true
  }
}

export const Error: Story = {
  args: {
    name: 'input-with-error',
    label: 'This is a checkbox',
    labelSmall: 'This is a small label',
    initialValues: { 'input-with-error': 'DEABCDEFG' },
    initialTouched: { 'input-with-error': true },
    validateOnMount: false,
    initialErrors: { 'input-with-error': 'This is an error' }
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
