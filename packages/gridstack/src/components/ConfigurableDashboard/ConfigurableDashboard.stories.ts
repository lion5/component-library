import { Meta, StoryObj } from '@storybook/vue3-vite'
import {
  WidgetConfiguration,
  WidgetSetting
} from '@/models/widgetConfiguration'
import { TEMPLATE_WIDGET_WRAPPER } from '@/components/widgets/TemplateWidget/config'
import { GridWidget } from '@/models/gridWidget'
import ConfigurableDashboard from '@/components/ConfigurableDashboard/ConfigurableDashboard.vue'
import { ref } from 'vue'
import { action } from 'storybook/actions'
import { IFRAME_WIDGET_WRAPPER } from '@/components/widgets/IFrameWidget/config'
import { REFRESHABLE_IMAGE_WIDGET_WRAPPER } from '@/components/widgets/RefreshableImageWidget/config'

/**
 * This component is used to generate the widgets edit form dynamically based on a form schema.
 * All vee validate compatible inputs can be used. The validation is provided by yup.
 */
export default {
  component: ConfigurableDashboard
} as Meta<typeof ConfigurableDashboard>
type Story = StoryObj<typeof ConfigurableDashboard>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { ConfigurableDashboard },
    setup() {
      const dashboardConfig = ref([
        new WidgetConfiguration('a', new GridWidget(0, 0, 9, 12), 'widget1'),
        new WidgetConfiguration('b', new GridWidget(10, 0, 3, 9), 'widget1'),
        new WidgetConfiguration('c', new GridWidget(10, 10, 3, 3), 'widget1')
      ])
      const save = action('save')
      const deleteDashboardConfiguration = action(
        'deleteDashboardConfiguration'
      )
      return { args, dashboardConfig, save, deleteDashboardConfiguration }
    },
    template: `
      <div style='height: 60vh'>
        <ConfigurableDashboard v-bind='args' v-model:dashboardConfig='dashboardConfig' @save='save' @delete-dashboard-configuration='deleteDashboardConfiguration' />
      </div>`
  }),
  args: {
    editMode: false,
    saveModalError: undefined,
    showSaveModal: false,
    availableWidgets: new Map<string, WidgetSetting>([
      ['widget1', TEMPLATE_WIDGET_WRAPPER],
      ['widget2', IFRAME_WIDGET_WRAPPER],
      ['widget3', REFRESHABLE_IMAGE_WIDGET_WRAPPER]
    ]),
    dashboardConfigurationOptions: [
      { id: '1', name: 'Dashboard One' },
      { id: '2', name: 'Dashboard Two' }
    ],
    selectedDashboardConfiguration: undefined
  }
}
