import { Meta, StoryObj } from '@storybook/vue3-vite'
import NumberInput from './NumberInput.vue'
import { formWrapper } from '../../../../.storybook/decorators'
import { shallowRef } from 'vue'
import { userEvent } from 'storybook/test'

export default {
  component: NumberInput,
  title: 'Input Components/NumberInput',
  decorators: [formWrapper],
  render: (args: unknown) => ({
    components: { NumberInput },
    setup() {
      const number = shallowRef(args.modelValue)

      return { args, number }
    },
    template: `
      <NumberInput v-bind='args' v-model="number" />
      <p>Number: {{ number }}</p>`
  })
} as Meta<typeof NumberInput>
type Story = StoryObj<typeof NumberInput>

export const Empty: Story = {
  args: {
    name: 'number-input-empty',
    label: 'This is an example number field',
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
  }
}

export const Error: Story = {
  args: {
    ...Required.args,
    name: 'number-input-with-error',
  }
}
