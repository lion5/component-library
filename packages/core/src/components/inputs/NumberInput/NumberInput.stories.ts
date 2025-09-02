import { Meta, StoryObj } from '@storybook/vue3-vite'
import NumberInput from './NumberInput.vue'
import { ref } from 'vue'
import { userEvent } from 'storybook/test'
import { action } from 'storybook/actions'

export default {
  component: NumberInput,
  title: 'Input Components/NumberInput',
  render: (args: unknown) => ({
    components: { NumberInput },
    setup() {
      const value = ref(args.modelValue)
      const onInput = action('input')

      return { args, value, onInput }
    },
    template: `<NumberInput v-bind='args' v-model="value" @update:model-value="onInput" />`
  })
} as Meta<typeof NumberInput>
type Story = StoryObj<typeof NumberInput>

export const BasicEmpty: Story = {
  args: {
    name: 'basic-number-input-empty',
    label: 'Basic'
  }
}

export const BasicFilled: Story = {
  args: {
    ...BasicEmpty.args,
    name: 'basic-number-input-filled',
    label: 'Basic Filled',
    modelValue: 120
  },
  play: async ({ canvas }) => {
    await userEvent.type(canvas.getByLabelText('Basic Filled'), '0,45', { delay: 50 })
    await userEvent.tab()
  }
}

export const BasicRequired: Story = {
  args: {
    ...BasicEmpty.args,
    name: 'basic-number-input-required',
    label: 'Basic Required',
    required: true
  }
}

export const BasicError: Story = {
  args: {
    ...BasicFilled.args,
    name: 'number-input-with-error',
    invalid: true,
    errors: [new Error('This is an error message.')]
  }
}

export const IconPrefixEmpty: Story = {
  render: (args: unknown) => ({
    components: { NumberInput },
    setup() {
      const value = ref(args.modelValue)
      const onInput = action('input')

      return { args, value, onInput }
    },
    template: `<NumberInput v-bind='args' v-model="value" @update:model-value="onInput">
      <template #prefix>
        <i class="bi bi-currency-euro"></i>
      </template>
    </NumberInput>`
  }),
  args: {
    ...BasicEmpty.args,
    name: 'icon-prefix-number-input-empty'
  }
}
export const IconPrefixFilled: Story = {
  render: IconPrefixEmpty.render,
  args: {
    ...BasicFilled.args,
    name: 'icon-prefix-number-input-filled',
    label: 'Icon Prefix Filled'
  }
}
export const IconPrefixRequired: Story = {
  render: IconPrefixEmpty.render,
  args: {
    ...BasicRequired.args,
    name: 'icon-prefix-number-input-required',
    label: 'Icon Prefix Required'
  }
}

export const IconPostfixFilled: Story = {
  render: (args: unknown) => ({
    components: { NumberInput },
    setup() {
      const value = ref(args.modelValue)
      const onInput = action('input')

      return { args, value, onInput }
    },
    template: `<NumberInput v-bind='args' v-model="value" @update:model-value="onInput">
      <template #postfix>
        <i class="bi bi-currency-euro"></i>
      </template>
    </NumberInput>`
  }),
  args: {
    ...BasicFilled.args,
    name: 'icon-postfix-number-input-filled',
    label: 'Icon Postfix Filled'
  }
}

export const IconPostfixPlusStepButtons: Story = {
  render: IconPostfixFilled.render,
  args: {
    ...BasicFilled.args,
    name: 'icon-postfix-and-step-buttons-number-input-filled',
    label: 'Icon Postfix Filled',
    stepButtonsVariant: 'inside'
  }
}

export const IconPostfixPlusOuterStepButtons: Story = {
  render: IconPostfixFilled.render,
  args: {
    ...BasicFilled.args,
    name: 'icon-postfix-and-step-buttons-number-input-filled',
    label: 'Icon Postfix Filled',
    stepButtonsVariant: 'outside',
    labelType: 'hidden'
  }
}
