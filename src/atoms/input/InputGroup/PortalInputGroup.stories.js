import PortalInputGroup from './PortalInputGroup.vue'
import { action } from '@storybook/addon-actions'

export default {
  title: 'molecules/input/PortalInputGroup',
  component: PortalInputGroup
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { PortalInputGroup },
  template: '<PortalInputGroup @input="action" v-bind="$props" />',
  methods: { action: action('input') }
})

export const TypeText = Template.bind({})
TypeText.args = {
  id: 'input-group-text',
  type: 'text',
  label: 'Name'
}

export const TypeEMail = Template.bind({})
TypeEMail.args = {
  id: 'input-group-email',
  type: 'email',
  label: 'E-Mail'
}

export const TypeNumber = Template.bind({})
TypeNumber.args = {
  id: 'input-group-number',
  type: 'number',
  label: 'Number'
}

export const Prefix = Template.bind({})
Prefix.args = {
  ...Number.args,
  label: 'Betrag',
  id: 'input-group-text-prefix',
  prefix: '€'
}

export const Postfix = Template.bind({})
Postfix.args = {
  ...Number.args,
  label: 'Betrag',
  id: 'input-group-text-postfix',
  postfix: '€'
}

export const PrefixPostfix = Template.bind({})
PrefixPostfix.args = {
  ...Number.args,
  label: 'Betrag',
  id: 'input-group-text-prefix-postfix',
  prefix: 'Bis',
  postfix: '€'
}

export const Filled = Template.bind({})
Filled.args = {
  ...TypeText.args,
  id: 'input-group-text-filled',
  value: 'Mustermensch'
}
