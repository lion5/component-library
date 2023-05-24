import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import {
  TemplateWidgetSetting,
  TemplateWidgetSettingsFormSchema
} from '@/atoms/dashboard/widgets/TemplateWidget/settings'
import TemplateWidget from '@/atoms/dashboard/widgets/TemplateWidget/TemplateWidget.vue'

/**
 * This is the main configuration that need to be added to the {@link availableWidgets} map.
 * It contains the display name of the Widget, the widget component, the default settings and the form schema that is used to render the settings form.
 */
export const TEMPLATE_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Template Widget',
  TemplateWidget,
  new Map([
    [TemplateWidgetSetting.EXAMPLE, 'example-config-parameter'],
    [TemplateWidgetSetting.GREETING, 'World']
  ]),
  TemplateWidgetSettingsFormSchema
)
