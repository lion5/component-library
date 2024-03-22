import MessageBox from '@core/atoms/boxes/MessageBox/MessageBox.vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: MessageBox
} as Meta<typeof MessageBox>
type Story = StoryObj<typeof MessageBox>

export const InfoMessage: Story = {
  args: {
    infoMessage: 'This is an informational message'
  }
}

export const ErrorMessage: Story = {
  args: {
    errorMessage: 'This is an error message'
  }
}
