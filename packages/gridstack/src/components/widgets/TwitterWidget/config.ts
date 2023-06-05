import TwitterWidget from '@/components/widgets/TwitterWidget/TwitterWidget.vue'
import {
  TwitterWidgetFormSchema,
  TwitterWidgetSetting
} from '@/components/widgets/TwitterWidget/settings'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'

export const TWITTER_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Twitter (Nitter)',
  TwitterWidget,
  new Map([[TwitterWidgetSetting.TAG, '#bamberg']]),
  TwitterWidgetFormSchema
)
