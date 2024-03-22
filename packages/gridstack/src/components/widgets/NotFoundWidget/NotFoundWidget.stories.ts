import { Meta, StoryObj } from '@storybook/vue3'
import NotFoundWidget from './NotFoundWidget.vue'

export default {
  component: NotFoundWidget
} as Meta<typeof NotFoundWidget>
type Story = StoryObj<typeof NotFoundWidget>

export const Default: Story = {
  args: {
    widgetName: 'Unknown Widget'
  }
}
