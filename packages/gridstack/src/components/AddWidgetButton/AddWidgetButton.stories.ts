import { Meta, StoryObj } from '@storybook/vue3'
import AddWidgetButton from './AddWidgetButton.vue'
import { TEMPLATE_WIDGET_WRAPPER } from '@/components/widgets/TemplateWidget/config'

export default {
  component: AddWidgetButton
} as Meta<typeof AddWidgetButton>
type Story = StoryObj<typeof AddWidgetButton>

export const Default: Story = {
  args: {
    availableWidgets: new Map([['template', TEMPLATE_WIDGET_WRAPPER]])
  }
}
