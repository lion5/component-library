import { action } from '@storybook/addon-actions'
import InformationButton from '@core/atoms/buttons/InformationButton/InformationButton.vue'

export default {
  component: InformationButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    InformationButton
  },
  template: `
    <InformationButton v-bind="$props" @click="click">
      An Informative Text or other html.
    </InformationButton>
  `,
  methods: {
    click: action('click')
  }
})

export const Default = Template.bind({})
Default.args = {
  title: 'Information about Topic'
}
