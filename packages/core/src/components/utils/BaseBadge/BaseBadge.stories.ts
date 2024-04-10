import { Meta, StoryObj } from '@storybook/vue3'
import BaseBadge from './BaseBadge.vue'

export default {
  component: BaseBadge,
  render: (args) => ({
    components: { BaseBadge },
    setup() {
      return { args }
    },
    template: `
      <BaseBadge v-bind="args" />`
  })
} as Meta<typeof BaseBadge>
type Story = StoryObj<typeof BaseBadge>

export const Default: Story = {
  args: {
    label: 'my badge'
  }
}

export const WithDescription: Story = {
  args: {
    label: 'my badge',
    description: 'Here you can find additional infos about my badge'
  }
}
