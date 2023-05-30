import { Meta, StoryObj } from '@storybook/vue3'
import WidgetWrapper from './WidgetWrapper.vue'

export default {
  component: WidgetWrapper
} as Meta<typeof WidgetWrapper>
type Story = StoryObj<typeof WidgetWrapper>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { WidgetWrapper },
    setup() {
      return { args }
    },
    template: `
      <WidgetWrapper v-bind="args">Hello World!</WidgetWrapper>`
  })
}

export const Busy: Story = {
  ...Default,
  args: {
    busy: true
  }
}

export const WithError: Story = {
  ...Default,
  args: {
    error: new Error('This widget cannot be loaded!')
  }
}
