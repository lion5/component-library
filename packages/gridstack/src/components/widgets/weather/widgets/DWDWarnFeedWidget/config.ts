import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import {
  WeatherWarnSetting,
  WeatherWarnSettingsFormSchema
} from '@/components/widgets/weather/widgets/DWDWarnFeedWidget/settings'
import WeatherWarnFeedWidget from '@/components/widgets/weather/widgets/DWDWarnFeedWidget/WeatherWarnFeedWidget.vue'
import { NamedLocation, GpsLocation } from '@lion5/component-library'

export const WEATHER_WARN_FEED_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Wetterwarnungen',
  WeatherWarnFeedWidget,
  new Map([
    [
      WeatherWarnSetting.LOCATION,
      new NamedLocation(new GpsLocation(49.892728, 10.889287), 'Bamberg')
    ]
  ]),
  WeatherWarnSettingsFormSchema
)
