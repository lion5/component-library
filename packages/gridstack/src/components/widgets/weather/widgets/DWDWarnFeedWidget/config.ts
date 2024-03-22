import { GpsLocation, NamedLocation } from '@lion5/component-library'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'
import {
  WeatherWarnSetting,
  WeatherWarnSettingsFormSchema
} from '@gridstack/components/widgets/weather/widgets/DWDWarnFeedWidget/settings'
import WeatherWarnFeedWidget from '@gridstack/components/widgets/weather/widgets/DWDWarnFeedWidget/WeatherWarnFeedWidget.vue'

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
