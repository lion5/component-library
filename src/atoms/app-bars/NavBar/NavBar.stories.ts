import { Meta, StoryObj } from '@storybook/vue3'
import NavBar from './NavBar.vue'

export default {
  component: NavBar
} as Meta<typeof NavBar>
type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  args: {}
}
