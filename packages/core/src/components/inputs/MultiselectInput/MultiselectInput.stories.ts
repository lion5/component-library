import MultiselectInput from './MultiselectInput.vue'
import { SelectOption } from '../BaseSelect/selectOption'

export default {
  components: { MultiselectInput },
  component: MultiselectInput,
  title: 'Input Components/MultiselectInput'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    MultiselectInput
  },
  setup() {
    return { args }
  },
  template: '<MultiselectInput v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  id: 'select-input',
  label: 'Option',
  entityName: 'Optionen',
  options: [
    new SelectOption(true, 'True options'),
    new SelectOption('option1', 'Option 1'),
    new SelectOption('option2', 'Option 2'),
    new SelectOption('option3', 'Option 3'),
    new SelectOption('option4', 'Option 4'),
    new SelectOption('option5', 'Option 5')
  ]
}

export const Images = Template.bind({})
Images.args = {
  id: 'select-input',
  label: 'Option',
  entityName: 'Optionen',
  options: [
    new SelectOption('option1', 'Option 1', 'https://placehold.co/200/orange/white?text=Option+1'),
    new SelectOption('option2', 'Option 2', 'https://placehold.co/200/blue/white?text=Option+1'),
    new SelectOption('option3', 'Option 3', 'https://placehold.co/200/red/white?text=Option+1'),
    new SelectOption('option4', 'Option 4', 'https://placehold.co/200/green/white?text=Option+1'),
    new SelectOption('option5', 'Option 5', 'https://placehold.co/200/purple/white?text=Option+1')
  ]
}

export const Icons = Template.bind({})
Icons.args = {
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

export const NotSearchable = Template.bind({})
NotSearchable.args = {
  id: 'select-input',
  label: 'Option',
  entityName: 'Optionen',
  searchable: false,
  options: [
    new SelectOption(true, 'True Option'),
    new SelectOption('option1', 'Option One'),
    new SelectOption('option2', 'Option Two')
  ]
}

export const WithError = Template.bind({})
WithError.args = {
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

export const Required = Template.bind({})
Required.args = {
  id: 'select-input',
  label: 'Option',
  entityName: 'Optionen',
  required: true,
  options: [
    new SelectOption(true, 'True options'),
    new SelectOption('option1', 'Option 1'),
    new SelectOption('option2', 'Option 2'),
    new SelectOption('option3', 'Option 3'),
    new SelectOption('option4', 'Option 4'),
    new SelectOption('option5', 'Option 5')
  ]
}
