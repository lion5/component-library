import { Meta, StoryObj } from '@storybook/vue3-vite'
import LayoutSectionHeader from './LayoutSectionHeader.vue'

export default {
  component: LayoutSectionHeader,
  title: 'Layout Components/LayoutSectionHeader',
  render: (args) => ({
    components: { LayoutSectionHeader },
    setup() {
      return { args }
    },
    template: `
      <LayoutSectionHeader v-bind="args"/>`
  })
} as Meta<typeof LayoutSectionHeader>
type Story = StoryObj<typeof LayoutSectionHeader>

export const Private: Story = {
  args: {
    title: 'My Private Settings',
    subtitle: 'This is a subtitle of a private section.',
    isPrivate: true,
    prefixIconId: 'bi-gear'
  }
}

export const Public: Story = {
  args: {
    title: 'My Public Settings',
    subtitle: 'This is a subtitle of a public section.',
    isPrivate: false,
    prefixIconId: 'bi-gear'
  }
}
