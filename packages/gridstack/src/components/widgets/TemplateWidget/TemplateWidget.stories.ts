import { Meta, StoryObj } from '@storybook/vue3'
import TemplateWidget from './TemplateWidget.vue'
import { TemplateWidgetSetting } from './settings'

export default {
  component: TemplateWidget
} as Meta<typeof TemplateWidget>
type Story = StoryObj<typeof TemplateWidget>

export const Default: Story = {
  args: {
    settings: new Map([]),
    defaultSettings: new Map([
      [TemplateWidgetSetting.EXAMPLE, 'example-config-parameter'],
      [TemplateWidgetSetting.GREETING, 'World']
    ])
  }
}
