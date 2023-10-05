import { Meta, StoryObj } from '@storybook/vue3'
import NavBar from './NavBar.vue'
import { NavItem } from './navItem'
import IconSettings from '@core/icons/IconSettings.vue'
import IconDashboard from '@core/icons/IconDashboard.vue'

export default {
  component: NavBar
} as Meta<typeof NavBar>
type Story = StoryObj<typeof NavBar>

export const Default: Story = {
  args: {
    navItems: [
      new NavItem('Einstellungen', '/', IconSettings),
      new NavItem('Home', '/', IconDashboard)
    ]
  }
}
