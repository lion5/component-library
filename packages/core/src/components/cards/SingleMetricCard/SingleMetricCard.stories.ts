import { Meta, StoryObj } from '@storybook/vue3-vite'
import SingleMetricCard from './SingleMetricCard.vue'

export default {
  component: SingleMetricCard,
  title: 'Display Components/Cards/SingleMetricCard',
} as Meta<typeof SingleMetricCard>
type Story = StoryObj<typeof SingleMetricCard>

export const Default: Story = {
  args: {
    metricName: 'Gutscheinanzahl',
    value: '249'
  }
}
