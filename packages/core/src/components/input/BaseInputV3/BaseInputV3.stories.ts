import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseInputV3 from './BaseInputV3.vue'
import { BaseIcon } from '../../icons'
import IconButton from '../../buttons/IconButton/IconButton.vue'

export default {
  component: BaseInputV3,
  title: 'Input Components/BaseInput'
} as Meta<typeof BaseInputV3>
type Story = StoryObj<typeof BaseInputV3>

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

export const FilledWithoutFloatingLabel: Story = {
  args: {
    ...Filled.args,
    name: 'test-filled-without-floating-label',
    floatingLabel: false
  }
}

export const FilledWithoutLabel: Story = {
  args: {
    ...Filled.args,
    name: 'test-filled-without-label',
    hideLabel: true
  }
}

export const FilledWithPostfix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3 v-bind='args'>
        <template #postfix>
          <BaseIcon icon="bi-currency-euro" />
        </template>
      </BaseInputV3>
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
    components: { BaseInputV3, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3 v-bind='args'>
        <template #prefix>
          <BaseIcon icon="bi-house" />
        </template>
      </BaseInputV3>
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
    components: { BaseInputV3, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3 v-bind='args'>
        <template #prefix>
          <BaseIcon icon="bi-house" />
        </template>
        <template #postfix>
          <BaseIcon icon="bi-currency-euro" />
        </template>
      </BaseInputV3>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text'
  }
}

export const FilledWithFixedPostfix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3, BaseIcon },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3 v-bind='args'>
        <template #prefix>
          <BaseIcon icon="bi-house" />
        </template>
        <template #fixed-postfix>
          <BaseIcon icon="bi-currency-euro" />
        </template>
      </BaseInputV3>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text',
    invalid: true
  }
}

export const WithOutterPreAndPostfix: Story = {
  render: (args: unknown) => ({
    components: { BaseInputV3, BaseIcon, IconButton },
    setup() {
      return { args }
    },
    template: `
      <BaseInputV3 v-bind='args'>
        <template #before-input>
          <IconButton label="plus">
            <BaseIcon icon="bi-dash-lg" />
          </IconButton>
        </template>
        <template #after-input>
          <IconButton label="plus">
            <BaseIcon icon="bi-plus-lg" />
          </IconButton>
        </template>
      </BaseInputV3>
    `
  }),
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text',
    invalid: true,
    errors: [new Error('Some error')]
  }
}

export const WithError: Story = {
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    modelValue: 'Some text',
    invalid: true,
    errors: [new Error('Some error')]
  }
}

export const Required: Story = {
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    type: 'text',
    required: true
  }
}
