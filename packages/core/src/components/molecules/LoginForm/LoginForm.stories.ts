import { Meta, StoryObj } from '@storybook/vue3-vite'
import LoginForm from './LoginForm.vue'

export default {
  component: LoginForm
} as Meta<typeof LoginForm>
type Story = StoryObj<typeof LoginForm>

export const Default: Story = {}

export const Busy: Story = {
  args: {
    busy: true
  }
}

export const Error: Story = {
  args: {
    errorMessage: 'Error occurred'
  }
}

export const Info: Story = {
  args: {
    infoMessage: 'Information'
  }
}
