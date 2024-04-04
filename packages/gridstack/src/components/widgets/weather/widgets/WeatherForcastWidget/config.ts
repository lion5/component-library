import { GpsLocation, NamedLocation } from '@lion5/component-library'
import {
  WeatherForecastSetting,
  WeatherForecastSettingsFormSchema
} from '@/components/widgets/weather/widgets/WeatherForcastWidget/settings'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import WeatherForecastWidget from '@/components/widgets/weather/widgets/WeatherForcastWidget/WeatherForecastWidget.vue'

export const WEATHER_FORECAST_WIDGET_WRAPPER = new WidgetComponentWrapper(
  'Wettervorhersage',
  WeatherForecastWidget,
  new Map([
    [
      WeatherForecastSetting.LOCATION,
      new NamedLocation(new GpsLocation(49.892728, 10.889287), 'Bamberg')
    ]
  ]),
  WeatherForecastSettingsFormSchema
)
