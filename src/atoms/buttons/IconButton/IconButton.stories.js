import { action } from '@storybook/addon-actions'
import IconArrowRepeat from '@/icons/IconArrowRepeat.vue'
import IconButton from '@/atoms/buttons/IconButton/IconButton.vue'

export default {
  component: IconButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    IconButton,
    IconArrowRepeat
  },
  template: `
    <IconButton v-bind="$props" @click="click">
      <IconArrowRepeat/>
    </IconButton>
  `,
  methods: {
    click: action('click')
  }
})

export const Default = Template.bind({})
