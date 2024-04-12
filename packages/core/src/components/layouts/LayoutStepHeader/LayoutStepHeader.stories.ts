import { Meta, StoryObj } from '@storybook/vue3'
import LayoutStepHeader from './LayoutStepHeader.vue'

export default {
  component: LayoutStepHeader,
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
