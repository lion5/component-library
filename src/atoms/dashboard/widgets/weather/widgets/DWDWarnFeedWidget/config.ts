import { WidgetComponentWrapper } from '@/atoms/dashboard/models/widgetComponentWrapper'
import {
  WeatherWarnSetting,
  WeatherWarnSettingsFormSchema
} from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnFeedWidget/settings'
import { NamedLocation } from '@/models/namedLocation'
import { GpsLocation } from '@/models/gpsLocation'
import WeatherWarnFeedWidget from '@/atoms/dashboard/widgets/weather/widgets/DWDWarnFeedWidget/WeatherWarnFeedWidget.vue'

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
