import { Meta, StoryObj } from '@storybook/vue3-vite'
import EmailLink from './EmailLink.vue'

export default {
  component: EmailLink,
  title: 'Display Components/EmailLink',
  render: (args) => ({
    components: { EmailLink },
    setup() {
      return { args }
    },
    template: `
      <EmailLink v-bind="args" />`
  })
} as Meta<typeof EmailLink>
type Story = StoryObj<typeof EmailLink>

export const Default: Story = {
  args: {
    emailAddress: 'jane-doe@example.com'
  }
}

export const Empty: Story = {
  args: {
    emailAddress: ''
  }
}
