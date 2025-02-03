import { Meta, StoryObj } from '@storybook/vue3'
import NumberInputValidated from './NumberInputValidated.vue'
import { formWrapper } from '../../../../.storybook/decorators'
import { shallowRef } from 'vue'
import { userEvent } from '@storybook/test'
import { number } from 'yup'

export default {
  component: NumberInputValidated,
  title: 'Input Components/NumberInputValidated',
  decorators: [formWrapper],
  render: (args: unknown) => ({
    components: { NumberInputValidated },
    setup() {
      const number = shallowRef(args.modelValue)

      return { args, number }
    },
    template: `
      <NumberInputValidated v-bind='args' v-model="number" />
      <p>Number: {{ number }}</p>`
  })
} as Meta<typeof NumberInputValidated>
type Story = StoryObj<typeof NumberInputValidated>

export const Empty: Story = {
  args: {
    name: 'number-input-empty',
    label: 'This is an example number field',
    validationRules: number().required()
  }
}

export const Filled: Story = {
  args: {
    ...Empty.args,
    name: 'number-input-filled',
    label: 'Quantity'
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText('Quantity'), '1234', { delay: 10 })
    await userEvent.tab()
  }
}

export const Required: Story = {
  args: {
    ...Empty.args,
    name: 'number-input-required',
    validationRules: number().required()
  }
}

export const Error: Story = {
  args: {
    ...Required.args,
    name: 'number-input-with-error',
    validationRules: number().required(),
    initialTouched: { 'number-input-with-error': true },
    validateOnMount: true
  }
}
