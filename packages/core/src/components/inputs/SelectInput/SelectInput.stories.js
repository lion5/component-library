import SelectInput from '@core/components/inputs/SelectInput/SelectInput.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'

export default {
  components: { SelectInput },
  component: SelectInput
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    SelectInput
  },
  setup() {
    return { args }
  },
  template: '<SelectInput v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
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

export const Booleans = Template.bind({})
Booleans.args = {
  id: 'select-input',
  label: 'Option',
  entityName: 'Optionen',
  options: [new SelectOption(true, 'Wahr', '', ''), new SelectOption(false, 'Falsch', '', '')]
}

export const NotSearchable = Template.bind({})
NotSearchable.args = {
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
