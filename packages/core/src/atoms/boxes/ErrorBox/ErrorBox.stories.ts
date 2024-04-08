import ErrorBox from '@core/atoms/boxes/ErrorBox/ErrorBox.vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: ErrorBox
} as Meta<typeof ErrorBox>
type Story = StoryObj<typeof ErrorBox>

/**
 * If only one error is given. It displays the error inside the box as string.
 */
export const SingleError: Story = {
  args: {
    error: new Error('This is an error!')
  }
}

export const MultipleErrors: Story = {
  args: {
    errors: [
      new Error('This is an error!'),
      new Error('This is an error!'),
      new Error('This is an error!'),
      new Error('This is an error!')
    ]
  }
}
