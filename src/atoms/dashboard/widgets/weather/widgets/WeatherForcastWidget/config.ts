import { WidgetComponentWrapper } from '@/atoms'
import {
  WeatherForecastSetting,
  WeatherForecastSettingsFormSchema
} from '@/atoms/dashboard/widgets/weather/widgets/WeatherForcastWidget/settings'
import { NamedLocation } from '@/models/namedLocation'
import { GpsLocation } from '@/models/gpsLocation'
import WeatherForecastWidget from '@/atoms/dashboard/widgets/weather/widgets/WeatherForcastWidget/WeatherForecastWidget.vue'

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
