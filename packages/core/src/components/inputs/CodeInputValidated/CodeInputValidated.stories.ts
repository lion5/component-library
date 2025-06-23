import { Meta, StoryObj } from '@storybook/vue3-vite'
import { Form } from 'vee-validate'
import CodeInput from './CodeInputValidated.vue'
import { action } from 'storybook/actions'

export default {
  component: CodeInput,
  title: 'Input Components/CodeInputValidated'
} as Meta<typeof CodeInput>
type Story = StoryObj<typeof CodeInput>

export const Empty: Story = {
  render: (args) => ({
    components: { CodeInput, Form },
    setup() {
      const onCodeUpdate = action('onCodeUpdate')
      const onInputFinished = action('onInputFinished')
      return { args, onCodeUpdate, onInputFinished }
    },
    template: `
      <Form>
        <CodeInput v-bind="args" @update:code="onCodeUpdate"
                   @input-finished="onInputFinished" />
      </Form>`
  }),
  args: {
    name: 'test-empty'
  }
}

export const Filled: Story = {
  render: (args) => ({
    components: { CodeInput, Form },
    setup() {
      const onCodeUpdate = action('onCodeUpdate')
      const onInputFinished = action('onInputFinished')
      return { args, onCodeUpdate, onInputFinished }
    },
    template: `
      <Form :initialValues='{ input1: "ABCD1234" }'>
        <CodeInput v-bind="args" @update:code="onCodeUpdate"
                   @input-finished="onInputFinished" />
      </Form>`
  }),
  args: {
    name: 'input1',
    code: 'ABCD1234'
  }
}

export const FilledWithLabel: Story = {
  render: (args) => ({
    components: { CodeInput, Form },
    setup() {
      const onCodeUpdate = action('onCodeUpdate')
      const onInputFinished = action('onInputFinished')
      return { args, onCodeUpdate, onInputFinished }
    },
    template: `
      <Form :initialValues='{ input1: "ABCD1234" }'>
        <CodeInput v-bind="args" @update:code="onCodeUpdate"
                   @input-finished="onInputFinished" />
      </Form>`
  }),
  args: {
    name: 'input1',
    code: 'ABCD1234',
    label: 'Code'
  }
}

export const WithError: Story = {
  render: (args) => ({
    components: { CodeInput, Form },
    setup() {
      const onCodeUpdate = action('onCodeUpdate')
      const onInputFinished = action('onInputFinished')
      return { args, onCodeUpdate, onInputFinished }
    },
    template: `
      <Form :initialValues='{"input-with-error": "§$%&"}'
            :initialTouched='{"input-with-error": true}'
            :initialErrors='{"input-with-error": "Dieser Code ist ungültig."}'
      >
        <CodeInput v-bind="args" @update:code="onCodeUpdate"
                   @input-finished="onInputFinished" />
      </Form>`
  }),
  args: {
    name: 'input-with-error'
  }
}