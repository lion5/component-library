import { WidgetComponentWrapper, WidgetSetting } from '@/atoms'
import DWDWarnGermanyByCriteriaWidget from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/DWDWarnGermanyByCriteriaWidget.vue'
import {
  DWDWarnGermanyByCriteriaSetting,
  DWDWarnGermanyByCriteriaSettingsFormSchema
} from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnMapWidget/settings'

export const DWD_WARN_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Deutschlandkarte, einzelne Warnkriterien',
  DWDWarnGermanyByCriteriaWidget,
  new Map<string, WidgetSetting>([
    [DWDWarnGermanyByCriteriaSetting.CRITERIA, 'regen']
  ]),
  DWDWarnGermanyByCriteriaSettingsFormSchema
)
