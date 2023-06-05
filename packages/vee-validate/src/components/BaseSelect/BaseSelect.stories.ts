import { Meta, StoryObj } from '@storybook/vue3'
import BaseSelect from './BaseSelect.vue'
import { SelectOption } from '../../../models/selectOption'
import { Form } from 'vee-validate'
import { number } from 'yup'

export default {
  component: BaseSelect
} as Meta<typeof BaseSelect>
type Story = StoryObj<typeof BaseSelect>

export const Empty: Story = {
  args: {
    name: 'test1',
    label: 'Test Select',
    options: [
      new SelectOption(1, 'test1'),
      new SelectOption(2, 'test2'),
      new SelectOption(3, 'test3')
    ]
  }
}

export const EmptyWithOptionLabel: Story = {
  args: {
    ...Empty.args,
    optionsLabel: 'Select an option'
  }
}

export const Selected: Story = {
  render: (args) => ({
    components: { BaseSelect, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{test3: 1}'>
      <BaseSelect v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'test3'
  }
}

export const WithErrors: Story = {
  render: (args) => ({
    components: { BaseSelect, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialTouched='{test4: true}' :validateOnMount='false'
            :initialErrors='{test4: "This is an error"}'>
      <BaseSelect v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'test4',
    validationRules: number().required()
  }
}
