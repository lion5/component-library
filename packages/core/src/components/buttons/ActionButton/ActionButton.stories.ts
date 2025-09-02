import { action } from 'storybook/actions'
import ActionButton from './ActionButton.vue'
import IconArrowRepeat from '@core/components/icons/IconArrowRepeat.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  components: { ActionButton },
  component: ActionButton,
  title: 'Navigation Components/ActionButton',
  render: (args: unknown) => ({
    components: { ActionButton, IconArrowRepeat },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <ActionButton v-bind="args" @click="click">
        <IconArrowRepeat/>
      </ActionButton>
    `
  })
} as Meta<typeof ActionButton>
type Story = StoryObj<typeof ActionButton>

export const Default: Story = {
  args: {
    label: 'Reload'
  }
}
