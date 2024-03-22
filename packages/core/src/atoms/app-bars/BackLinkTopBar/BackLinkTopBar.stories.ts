import { Meta, StoryObj } from '@storybook/vue3'
import BackLinkTopBar from '../BackLinkTopBar/BackLinkTopBar.vue'

export default {
  component: BackLinkTopBar
} as Meta<typeof BackLinkTopBar>
type Story = StoryObj<typeof BackLinkTopBar>

export const Default: Story = {
  args: {
    title: 'Page Title'
  }
}
