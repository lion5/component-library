import ErrorBox from '../../boxes/ErrorBox/ErrorBox.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * The error box should be used to display global errors that are not tied to a specific input field.
 * It can display a single error or multiple errors.
 *
 * The error box can take props (error and errors) or content via slot that can be used to display errors.
 *
 * **If both props (error and errors) are undefined or empty and the slot is not used, the box will not be rendered!**
 */
export default {
  component: ErrorBox,
  title: 'Display Components/Boxes/ErrorBox'
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

export const SlotError: Story = {
  render: () => ({
    components: { ErrorBox },
    template: `
      <ErrorBox>
        <div style="display: flex; flex-direction: column; gap: var(--space-200);">
          <h2 style="margin: 0;">Error</h2>
          <p>This is some information about an error.</p>
        </div>
      </ErrorBox>`
  })
}
