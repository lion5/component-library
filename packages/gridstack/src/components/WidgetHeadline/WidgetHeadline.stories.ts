import { Meta, StoryObj } from '@storybook/vue3'
import WidgetHeadline from './WidgetHeadline.vue'

export default {
  component: WidgetHeadline
} as Meta<typeof WidgetHeadline>
type Story = StoryObj<typeof WidgetHeadline>

export const Default: Story = {
  args: {
    headline: 'My Custom Widget'
  }
}

export const WithSubHeading: Story = {
  args: {
    ...Default.args,
    subheading: 'A very special widget'
  }
}
