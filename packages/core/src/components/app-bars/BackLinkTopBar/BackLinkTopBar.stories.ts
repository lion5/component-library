import { Meta, StoryObj } from '@storybook/vue3-vite'
import BackLinkTopBar from '../BackLinkTopBar/BackLinkTopBar.vue'

export default {
  component: BackLinkTopBar,
  title: 'Navigation Components/App Bars/BackLinkTopBar',
} as Meta<typeof BackLinkTopBar>
type Story = StoryObj<typeof BackLinkTopBar>

export const Default: Story = {
  args: {
    title: 'Page Title'
  }
}
