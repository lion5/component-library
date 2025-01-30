import { Meta, StoryObj } from '@storybook/vue3'
import SelectInput from './SelectInput.vue'
import { SelectOption } from '../BaseSelect/selectOption'

/**
 * SelectInput can be configured via following css custom props
 * - `--input-width` to define the width of the input. Default is dynamically calculated based on the label and options length
 */
export default {
  component: SelectInput,
  title: 'Input Components/SelectInput'
} as Meta<typeof SelectInput>
type Story = StoryObj<typeof SelectInput>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    placeholder: 'Choose option',
    options: [
      new SelectOption(true, 'All options'),
      new SelectOption('option1', 'Option One'),
      new SelectOption('option2', 'Option Two')
    ]
  }
}

export const Images: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    options: [
      new SelectOption(
        'option1',
        'Option 1',
        'https://placehold.co/200/orange/white?text=Option+1'
      ),
      new SelectOption('option2', 'Option 2', 'https://placehold.co/200/blue/white?text=Option+1'),
      new SelectOption('option3', 'Option 3', 'https://placehold.co/200/red/white?text=Option+1'),
      new SelectOption('option4', 'Option 4', 'https://placehold.co/200/green/white?text=Option+1'),
      new SelectOption('option5', 'Option 5', 'https://placehold.co/200/purple/white?text=Option+1')
    ]
  }
}

export const Icons: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    options: [
      new SelectOption('option1', 'Option 1', '', 'bi-1-circle'),
      new SelectOption('option2', 'Option 2', '', 'bi-2-circle'),
      new SelectOption('option3', 'Option 3', '', 'bi-3-circle'),
      new SelectOption('option4', 'Option 4', '', 'bi-4-circle'),
      new SelectOption('option5', 'Option 5', '', 'bi-5-circle')
    ]
  }
}

export const WithError: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    name: 'select-input',
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    dirty: true,
    invalid: true,
    errors: ['This field is required'],
    options: [
      new SelectOption('option1', 'Option 1', '', 'bi-1-circle'),
      new SelectOption('option2', 'Option 2', '', 'bi-2-circle'),
      new SelectOption('option3', 'Option 3', '', 'bi-3-circle'),
      new SelectOption('option4', 'Option 4', '', 'bi-4-circle'),
      new SelectOption('option5', 'Option 5', '', 'bi-5-circle')
    ]
  }
}

export const Booleans: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    options: [new SelectOption(true, 'Wahr', '', ''), new SelectOption(false, 'Falsch', '', '')]
  }
}

export const NotSearchable: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    searchable: false,
    options: [
      new SelectOption(true, 'All options'),
      new SelectOption('option1', 'Option One'),
      new SelectOption('option2', 'Option Two')
    ]
  }
}

export const Required: Story = {
  render: (args: unknown) => ({
    components: { SelectInput },
    setup() {
      return { args }
    },
    template: `
      <div style="--input-width: 100%;">
        <SelectInput v-bind="args" />
      </div>`
  }),
  args: {
    id: 'select-input',
    label: 'Option',
    entityName: 'Optionen',
    placeholder: 'Choose option',
    required: true,
    options: [
      new SelectOption(true, 'All options'),
      new SelectOption('option1', 'Option One'),
      new SelectOption('option2', 'Option Two')
    ]
  }
}
