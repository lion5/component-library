import { Meta, StoryObj } from '@storybook/vue3-vite'
import LayoutStepHeader from './LayoutStepHeader.vue'

export default {
  component: LayoutStepHeader,
  title: 'Layout Components/LayoutStepHeader',
  render: (args) => ({
    components: { LayoutStepHeader },
    setup() {
      return { args }
    },
    template: `
      <LayoutStepHeader v-bind="args" />`
  })
} as Meta<typeof LayoutStepHeader>
type Story = StoryObj<typeof LayoutStepHeader>

export const Example: Story = {
  args: {
    stepId: 1,
    title: 'First Step to Do'
  }
}
