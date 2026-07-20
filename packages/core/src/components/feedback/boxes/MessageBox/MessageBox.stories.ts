import MessageBox from './MessageBox.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  component: MessageBox,
  title: 'Feedback/Boxes/MessageBox'
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
