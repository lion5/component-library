import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/vue3'
import CopyButton from './CopyButton.vue'

const meta: Meta<typeof CopyButton> = {
  component: CopyButton,
  render: (args) => ({
    components: { CopyButton },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <CopyButton v-bind="args" @click="click" />`
  })
}
export default meta
type Story = StoryObj<typeof CopyButton>

export const Example: Story = {
  args: {
    copyContent: 'Hello World!'
  }
}

/**
 * If the `copyContent` prop is not provided, the button will be hidden.
 */
export const HideIfNothingToCopy: Story = {
  args: {}
}
