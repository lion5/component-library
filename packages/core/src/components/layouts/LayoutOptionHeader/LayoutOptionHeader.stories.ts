import { Meta, StoryObj } from '@storybook/vue3'
import LayoutOptionHeader from './LayoutOptionHeader.vue'

export default {
  component: LayoutOptionHeader,
  title: 'Layout Components/LayoutOptionHeader',
  render: (args) => ({
    components: { LayoutOptionHeader },
    setup() {
      return { args }
    },
    template: `
      <LayoutOptionHeader v-bind="args"/>`
  })
} as Meta<typeof LayoutOptionHeader>
type Story = StoryObj<typeof LayoutOptionHeader>

export const Example: Story = {
  args: {
    optionId: 1,
    title: 'Settings'
  }
}
