import { Meta, StoryObj } from '@storybook/vue3-vite'
import NavBar from './NavBar.vue'
import { NavItem } from './navItem'
import IconSettings from '@core/components/icons/IconSettings.vue'
import IconDashboard from '@core/components/icons/IconDashboard.vue'

export default {
  component: NavBar,
  title: 'Navigation Components/App Bars/NavBar'
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
