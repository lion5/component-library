import { Meta, StoryObj } from '@storybook/vue3'
import TextareaInput from './TextareaInput.vue'

export default {
  component: TextareaInput,
  title: 'Input Components/TextareaInput'
} as Meta<typeof TextareaInput>
type Story = StoryObj<typeof TextareaInput>

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
    components: { TextareaInput },
    setup() {
      return { args }
    },
    template: `
      <TextareaInput v-bind='args'>
        <template #infoText>
          <small>Some info text</small>
        </template>
      </TextareaInput>
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
  args: {
    name: 'test-filled',
    label: 'Filled Text Input',
    modelValue: 'Some text',
    invalid: true,
    errors: [new Error('Some error')]
  }
}
