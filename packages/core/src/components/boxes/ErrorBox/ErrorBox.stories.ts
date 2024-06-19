import ErrorBox from '../../boxes/ErrorBox/ErrorBox.vue'
import { Meta, StoryObj } from '@storybook/vue3'

/**
 * The error box should be used to display global errors that are not tied to a specific input field.
 * It can display a single error or multiple errors.
 *
 * **If both props (error and errors) are undefined or empty, the box will not be rendered!**
 */
export default {
  component: ErrorBox
} as Meta<typeof ErrorBox>
type Story = StoryObj<typeof ErrorBox>

/**
 * If only one error is given. It displays the error inside the box on a single line.
 */
export const SingleError: Story = {
  args: {
    error: new Error('This is an error!')
  }
}

/**
 * If multiple errors are given. It displays each error as a list item.
 */
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
