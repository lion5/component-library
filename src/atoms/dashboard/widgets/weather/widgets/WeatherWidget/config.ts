import { WidgetComponentWrapper } from '@/atoms'
import WeatherWidget from '@/atoms/dashboard/widgets/weather/widgets/WeatherWidget/WeatherWidget.vue'
import { WeatherForecastSetting } from '@/atoms/dashboard/widgets/weather/widgets/WeatherForcastWidget/settings'
import { NamedLocation } from '@/models/namedLocation'
import { GpsLocation } from '@/models/gpsLocation'
import { WeatherSettingsFormSchema } from '@/atoms/dashboard/widgets/weather/widgets/WeatherWidget/settings'

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
