import DWDWarnGermanyByCriteriaWidget from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/DWDWarnGermanyByCriteriaWidget.vue'
import {
  DWDWarnGermanyByCriteriaSetting,
  DWDWarnGermanyByCriteriaSettingsFormSchema
} from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/settings'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import { WidgetSetting } from '@/atoms/dashboard/models/widgetConfiguration'

export const DWD_WARN_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Deutschlandkarte, einzelne Warnkriterien',
  DWDWarnGermanyByCriteriaWidget,
  new Map<string, WidgetSetting>([
    [DWDWarnGermanyByCriteriaSetting.CRITERIA, 'regen']
  ]),
  DWDWarnGermanyByCriteriaSettingsFormSchema
)
