import SelectInput from '@/inputs/SelectInput/SelectInput.vue'
import { SelectOption } from '@/inputs/BaseSelect/selectOption'

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
  placeholder: 'Choose option',
  options: [
    new SelectOption('option1', 'Option One'),
    new SelectOption('option2', 'Option Two')
  ]
}
