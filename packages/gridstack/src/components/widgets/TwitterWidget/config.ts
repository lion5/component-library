import TwitterWidget from '@gridstack/components/widgets/TwitterWidget/TwitterWidget.vue'
import {
  TwitterWidgetFormSchema,
  TwitterWidgetSetting
} from '@gridstack/components/widgets/TwitterWidget/settings'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'

export const TWITTER_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Twitter (Nitter)',
  TwitterWidget,
  new Map([[TwitterWidgetSetting.TAG, '#bamberg']]),
  TwitterWidgetFormSchema
)
