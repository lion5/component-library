import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseInputV1Validated from './BaseInputV1Validated.vue'
import { Form } from 'vee-validate'

export default {
  component: BaseInputV1Validated,
  tags: ['!dev', '!autodocs']
} as Meta<typeof BaseInputV1Validated>
type Story = StoryObj<typeof BaseInputV1Validated>

export const TextInput: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV1Validated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: "Text Input"}'>
      <BaseInputV1Validated v-bind="args" />
      </Form>`
  }),
  args: {
    name: 'input1',
    label: 'Text Input',
    type: 'text'
  }
}

export const EMailInput: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV1Validated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input2: "email@example.com"}'>
      <BaseInputV1Validated v-bind="args" />
      </Form>`
  }),
  args: {
    name: 'input2',
    label: 'Email Input',
    type: 'email'
  }
}

export const PasswordInput: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV1Validated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input3: "secret password"}'>
      <BaseInputV1Validated v-bind="args" />
      </Form>`
  }),
  args: {
    name: 'input3',
    label: 'Password Input',
    type: 'password'
  }
}

export const ColorInput: Story = {
  args: {
    name: 'test1',
    label: 'Color Input',
    type: 'color'
  }
}

export const Empty: Story = {
  args: {
    name: 'test-empty',
    label: 'Empty Text Input',
    type: 'text'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV1Validated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "Some wrong text"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount="false"
            :initialErrors='{"input-with-error": "This is an error"}'>
      <BaseInputV1Validated v-bind="args" />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'Text Input',
    type: 'text'
  }
}
