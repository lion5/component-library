import { Meta, StoryObj } from '@storybook/vue3-vite'
import TextareaInputValidated from './TextareaInputValidated.vue'
import { Form } from 'vee-validate'
import { number, string } from 'yup'

export default {
  component: TextareaInputValidated,
  title: 'Input Components/TextareaInputValidated'
} as Meta<typeof TextareaInputValidated>
type Story = StoryObj<typeof TextareaInputValidated>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    label: 'Empty Text Input'
  }
}

export const Filled: Story = {
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    modelValue: 'Some text'
  }
}

export const FilledWithMaxLength: Story = {
  args: {
    ...Filled.args,
    maxlength: '100'
  }
}

export const FilledWithInfoText: Story = {
  render: (args: unknown) => ({
    components: { TextareaInputValidated },
    setup() {
      return { args }
    },
    template: `
      <TextareaInputValidated v-bind='args'>
        <template #infoText>
          <small>Some info text</small>
        </template>
      </TextareaInputValidated>
    `
  }),
  args: {
    ...Filled.args
  }
}

export const FilledWithInfoTextAndMaxLength: Story = {
  render: FilledWithInfoText.render,
  args: {
    ...Filled.args,
    maxlength: '100'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { TextareaInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "Some wrong text"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='false'
            :keep-values="true"
            :initialErrors='{"input-with-error": "This is an error"}'>
        <TextareaInputValidated v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'Text Input',
    validationRules: number().required()
  }
}

export const Required: Story = {
  args: {
    name: 'test-required',
    label: 'Required Text Input',
    validationRules: string().required()
  }
}
