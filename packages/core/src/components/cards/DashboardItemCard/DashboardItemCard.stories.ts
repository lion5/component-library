import { Meta, StoryObj } from '@storybook/vue3-vite'
import DashboardItem from './DashboardItemCard.vue'
import { DashboardItem as DashboardItemClass } from './dashboardItem'

export default {
  component: DashboardItem,
  title: 'Display Components/Cards/DashboardItemCard'
} as Meta<typeof DashboardItem>
type Story = StoryObj<typeof DashboardItem>

export const Example: Story = {
  render: (args) => ({
    components: { DashboardItem },
    setup() {
      const items = [
        new DashboardItemClass('bi-person', 'Profile', 'profile'),
        new DashboardItemClass('bi-sliders', 'Account Settings', 'account-settings'),
        new DashboardItemClass('bi-bell', 'Notifications', 'notifications')
      ]
      return { args, items }
    },
    template: `<div style='display: grid; grid-template-columns: 1fr 1fr; gap: .75rem;'>
      <DashboardItem v-for="item in items" :key="item.name" :item='item' />
    </div>`
  }),
  args: {}
}
