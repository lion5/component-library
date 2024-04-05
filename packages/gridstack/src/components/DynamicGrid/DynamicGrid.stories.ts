import { Meta, StoryObj } from '@storybook/vue3'
import {
  WidgetConfiguration,
  WidgetSetting
} from '@/models/widgetConfiguration'
import DynamicGrid from '@/components/DynamicGrid/DynamicGrid.vue'
import { TEMPLATE_WIDGET_WRAPPER } from '@/components/widgets/TemplateWidget/config'
import { GridWidget } from '@/models/gridWidget'

/**
 * This component is used to generate the widgets edit form dynamically based on a form schema.
 * All vee validate compatible inputs can be used. The validation is provided by yup.
 */
export default {
  component: DynamicGrid
} as Meta<typeof DynamicGrid>
type Story = StoryObj<typeof DynamicGrid>

export const ViewMode: Story = {
  render: (args: unknown) => ({
    components: { DynamicGrid },
    setup() {
      return { args }
    },
    template: `
      <div style='height: 60vh'>
        <DynamicGrid v-bind='args' />
      </div>`
  }),
  args: {
    editMode: false,
    widgetConfigs: [
      new WidgetConfiguration('a', new GridWidget(0, 0, 9, 12), 'widget1'),
      new WidgetConfiguration('b', new GridWidget(10, 0, 3, 9), 'widget1'),
      new WidgetConfiguration('b', new GridWidget(10, 10, 3, 3), 'widget1')
    ],
    components: new Map<string, WidgetSetting>([
      ['widget1', TEMPLATE_WIDGET_WRAPPER]
    ]),
    customGridStackClass: 'view-mode-grid'
  }
}
export const EditMode: Story = {
  args: {
    ...ViewMode.args,
    editMode: true,
    customGridStackClass: 'edit-mode-grid'
  }
}
