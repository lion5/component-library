import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseInputV3Validated from './BaseInputV3Validated.vue'
import { BaseIcon } from '../../icons'
import { Form } from 'vee-validate'
import { number, string } from 'yup'

export default {
  component: BaseInputV3Validated,
  title: 'Input Components/BaseInputValidated'
} as Meta<typeof BaseInputV3Validated>
type Story = StoryObj<typeof BaseInputV3Validated>

export const Empty: Story = {
  args: {
    name: 'test-empty',
    label: 'Empty Text Input',
    type: 'text'
  }
}

export const Filled: Story = {
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text'
  }
}

export const FilledWithPostfix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3Validated, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3Validated v-bind='args'>
        <template #postfix>
          <BaseIcon icon="bi-currency-euro" />
        </template>
      </BaseInputV3Validated>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text'
  }
}

export const FilledWithPrefix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3Validated, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3Validated v-bind='args'>
        <template #prefix>
          <BaseIcon icon="bi-house" />
        </template>
      </BaseInputV3Validated>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text'
  }
}

export const FilledWithPostAndPrefix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3Validated, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3Validated v-bind='args'>
        <template #prefix>
          <BaseIcon icon="bi-house" />
        </template>
        <template #postfix>
          <BaseIcon icon="bi-currency-euro" />
        </template>
      </BaseInputV3Validated>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text'
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3Validated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{"input-with-error": "Some wrong text"}'
            :initialTouched='{"input-with-error": true}'
            :validateOnMount='false'
            :keep-values="true"
            :initialErrors='{"input-with-error": "This is an error"}'>
        <BaseInputV3Validated v-bind='args' />
      </Form>`
  }),
  args: {
    name: 'input-with-error',
    label: 'Text Input',
    type: 'text',
    validationRules: number().required()
  }
}

export const Required: Story = {
  args: {
    name: 'test-required',
    label: 'Required Text Input',
    type: 'text',
    validationRules: string().required('Dieses Feld ist erforderlich')
  }
}
