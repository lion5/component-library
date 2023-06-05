import { Meta, StoryObj } from '@storybook/vue3'
import BaseInput from '@/inputs/BaseInput/BaseInput.vue'
import { Form } from 'vee-validate'

export default {
  component: BaseInput
} as Meta<typeof BaseInput>
type Story = StoryObj<typeof BaseInput>

export const TextInput: Story = {
  render: (args: unknown) => ({
    components: { BaseInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input1: "Text Input"}'>
      <BaseInput v-bind="args" />
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
    components: { BaseInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input2: "email@example.com"}'>
      <BaseInput v-bind="args" />
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
    components: { BaseInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{input3: "secret password"}'>
      <BaseInput v-bind="args" />
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
    components: { BaseInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "Some wrong text"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount="false"
            :initialErrors='{"input-with-error": "This is an error"}'>
      <BaseInput v-bind="args" />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'Text Input',
    type: 'text'
  }
}
