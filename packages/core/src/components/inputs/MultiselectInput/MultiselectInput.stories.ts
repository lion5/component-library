import MultiselectInput from './MultiselectInput.vue'
import { SelectOption } from '../BaseSelect/selectOption'

export default {
  components: { MultiselectInput },
  component: MultiselectInput
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
    new SelectOption('option1', 'Option 1'),
    new SelectOption('option2', 'Option 2'),
    new SelectOption('option3', 'Option 3')
  ]
}
