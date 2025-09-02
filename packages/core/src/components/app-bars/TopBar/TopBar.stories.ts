import { Meta, StoryObj } from '@storybook/vue3-vite'
import TopBar from './TopBar.vue'

export default {
  component: TopBar,
  title: 'Navigation Components/App Bars/TopBar'
} as Meta<typeof TopBar>
type Story = StoryObj<typeof TopBar>

export const Default: Story = {
  args: {
    title: 'Page Title'
  }
}
