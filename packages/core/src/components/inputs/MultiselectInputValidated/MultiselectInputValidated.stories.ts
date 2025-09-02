import { Meta, StoryObj } from '@storybook/vue3-vite'
import { SelectOption } from '../BaseSelect/selectOption'
import { Form } from 'vee-validate'
import MultiSelectInputValidated from './MultiselectInputValidated.vue'
import { array } from 'yup'

export default {
  component: MultiSelectInputValidated,
  title: 'Input Components/MultiselectInputValidated'
} as Meta<typeof MultiSelectInputValidated>
type Story = StoryObj<typeof MultiSelectInputValidated>

export const Empty: Story = {
  args: {
    name: 'test1',
    label: 'Test Select',
    entityName: 'Optionen',
    options: [
      new SelectOption(1, 'test1'),
      new SelectOption(2, 'test2'),
      new SelectOption(3, 'test3')
    ]
  }
}

export const Selected: Story = {
  render: (args: unknown) => ({
    components: { MultiSelectInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues="{test2: [1]}">
        <MultiSelectInputValidated v-bind="args" />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'test2',
    id: 'test2'
  }
}

export const Images: Story = {
  render: (args: unknown) => ({
    components: { MultiSelectInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues="{test3: ['option1']}">
        <MultiSelectInputValidated v-bind="args" />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'test3',
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
    components: { MultiSelectInputValidated, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues="{test4: ['option1']}">
        <MultiSelectInputValidated v-bind="args" />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'test4',
    options: [
      new SelectOption('option1', 'Option 1', '', 'bi-1-circle'),
      new SelectOption('option2', 'Option 2', '', 'bi-2-circle'),
      new SelectOption('option3', 'Option 3', '', 'bi-3-circle'),
      new SelectOption('option4', 'Option 4', '', 'bi-4-circle'),
      new SelectOption('option5', 'Option 5', '', 'bi-5-circle')
    ]
  }
}

export const Required: Story = {
  args: {
    name: 'test required',
    label: 'Test Select',
    entityName: 'Optionen',
    validationRules: array().required().min(1),
    options: [
      new SelectOption('1', 'test1'),
      new SelectOption('2', 'test2'),
      new SelectOption('3', 'test3')
    ]
  }
}
