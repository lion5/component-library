import { GpsLocation, NamedLocation } from '@lion5/component-library'
import WeatherWidget from '@gridstack/components/widgets/weather/widgets/WeatherWidget/WeatherWidget.vue'
import { WeatherForecastSetting } from '@gridstack/components/widgets/weather/widgets/WeatherForcastWidget/settings'
import { WeatherSettingsFormSchema } from '@gridstack/components/widgets/weather/widgets/WeatherWidget/settings'
import { WidgetComponentWrapper } from '@gridstack/models/widgetComponentWrapper'

export const WEATHER_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Wetter',
  WeatherWidget,
  new Map([
    [
      WeatherForecastSetting.LOCATION,
      new NamedLocation(new GpsLocation(49.892728, 10.889287), 'Bamberg')
    ]
  ]),
  WeatherSettingsFormSchema
)
