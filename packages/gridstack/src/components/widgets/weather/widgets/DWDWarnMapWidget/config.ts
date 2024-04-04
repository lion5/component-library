import DWDWarnGermanyByCriteriaWidget from '@/components/widgets/weather/widgets/DWDWarnMapWidget/DWDWarnGermanyByCriteriaWidget.vue'
import {
  DWDWarnGermanyByCriteriaSetting,
  DWDWarnGermanyByCriteriaSettingsFormSchema
} from '@/components/widgets/weather/widgets/DWDWarnMapWidget/settings'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { WidgetSetting } from '@/models/widgetConfiguration'

export const DWD_WARN_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Deutschlandkarte, einzelne Warnkriterien',
  DWDWarnGermanyByCriteriaWidget,
  new Map<string, WidgetSetting>([
    [DWDWarnGermanyByCriteriaSetting.CRITERIA, 'regen']
  ]),
  DWDWarnGermanyByCriteriaSettingsFormSchema
)
