import IconArrowRepeat from '@core/icons/IconArrowRepeat.vue'
import IconButton from '@core/atoms/buttons/IconButton/IconButton.vue'

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
      <IconButton v-bind="$props">
      <IconArrowRepeat/>
      </IconButton>
    `
})

export const Default = Template.bind({})
