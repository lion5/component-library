import TwitterWidget from '@/atoms/dashboard/widgets/TwitterWidget/TwitterWidget.vue'
import {
  TwitterWidgetFormSchema,
  TwitterWidgetSetting
} from '@/atoms/dashboard/widgets/TwitterWidget/settings'
import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'

export const TWITTER_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Twitter (Nitter)',
  TwitterWidget,
  new Map([[TwitterWidgetSetting.TAG, '#bamberg']]),
  TwitterWidgetFormSchema
)
