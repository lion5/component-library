import { action } from '@storybook/addon-actions'
import ActionButton from '@core/components/buttons/ActionButton/ActionButton.vue'
import IconArrowRepeat from '@core/icons/IconArrowRepeat.vue'

export default {
  components: { ActionButton },
  component: ActionButton
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ActionButton,
    IconArrowRepeat
  },
  template: `
    <ActionButton v-bind="$props" @click="click">
      <IconArrowRepeat/>
    </ActionButton>
  `,
  methods: {
    click: action('click')
  }
})

export const Default = Template.bind({})
