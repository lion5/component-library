import IconArrowRepeat from '@core/components/icons/IconArrowRepeat.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'

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
