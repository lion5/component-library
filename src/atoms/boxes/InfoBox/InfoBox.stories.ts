import { Meta, StoryObj } from '@storybook/vue3'
import InfoBox from './InfoBox.vue'

export default {
  component: InfoBox
} as Meta<typeof InfoBox>
type Story = StoryObj<typeof InfoBox>

/**
 * If only one error is given. It displays the error inside the box as string.
 */
export const Default: Story = {
  args: {
    infoMessage: 'This is an info message'
  }
}
