import SingleMetricCard from '@/atoms/cards/SingleMetricCard/SingleMetricCard.vue'
import { Meta, StoryObj } from '@storybook/vue3'

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
