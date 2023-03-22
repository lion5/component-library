import { action } from '@storybook/addon-actions'
import InformationHeadline from '@/atoms/utils/InformationHeadline/InformationHeadline.vue'

export default {
  component: InformationHeadline
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    InformationHeadline
  },
  template: `
    <InformationHeadline v-bind="$props" @click="click">
      An Informative Text or other html.
    </InformationHeadline>
  `,
  methods: {
    click: action('click')
  }
})

export const Default = Template.bind({})
Default.args = {
  title: 'Topic',
  infoModalTitle: 'Information about Topic'
}
