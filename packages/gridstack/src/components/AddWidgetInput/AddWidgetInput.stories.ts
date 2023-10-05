import { Meta, StoryObj } from '@storybook/vue3'
import { TEMPLATE_WIDGET_WRAPPER } from '@gridstack/components/widgets/TemplateWidget/config'
import AddWidgetInput from './AddWidgetInput.vue'

export default {
  component: AddWidgetInput
} as Meta<typeof AddWidgetInput>
type Story = StoryObj<typeof AddWidgetInput>

export const Default: Story = {
  args: {
    widgetWrapper: TEMPLATE_WIDGET_WRAPPER
  }
}
