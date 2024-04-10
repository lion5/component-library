import { Meta, StoryObj } from '@storybook/vue3'
import SingleMetricCard from './SingleMetricCard.vue'

export default {
  component: SingleMetricCard
} as Meta<typeof SingleMetricCard>
type Story = StoryObj<typeof SingleMetricCard>

export const Default: Story = {
  args: {
    metricName: 'Gutscheinanzahl',
    value: '249'
  }
}
