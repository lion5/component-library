import { WidgetComponentWrapper } from '@/atoms'
import TwitterWidget from '@/atoms/dashboard/widgets/TwitterWidget/TwitterWidget.vue'
import {
  TwitterWidgetFormSchema,
  TwitterWidgetSetting
} from '@/atoms/dashboard/widgets/TwitterWidget/settings'

export const TWITTER_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Twitter (Nitter)',
  TwitterWidget,
  new Map([[TwitterWidgetSetting.TAG, '#bamberg']]),
  TwitterWidgetFormSchema
)
