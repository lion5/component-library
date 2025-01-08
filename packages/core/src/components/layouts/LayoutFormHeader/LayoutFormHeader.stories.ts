import { Meta, StoryObj } from '@storybook/vue3'
import LayoutFormHeader from './LayoutFormHeader.vue'

export default {
  component: LayoutFormHeader,
  title: 'Layout Components/LayoutFormHeader',
  render: (args) => ({
    components: { LayoutFormHeader },
    setup() {
      return { args }
    },
    template: `
      <LayoutFormHeader v-bind="args"/>`
  })
} as Meta<typeof LayoutFormHeader>
type Story = StoryObj<typeof LayoutFormHeader>

export const Basic: Story = {
  args: {
    title: 'Settings'
  }
}

export const Extended: Story = {
  args: {
    title: 'Settings',
    subtitle: 'The following the settings are public data.'
  }
}

export const ExtendedNotPublic: Story = {
  args: {
    title: 'Private Data',
    subtitle: 'The following the settings are private data.',
    isPublicData: false
  }
}
