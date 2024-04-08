import WeatherWidget from '@/components/widgets/weather/widgets/WeatherWidget/WeatherWidget.vue'
import { WeatherForecastSetting } from '@/components/widgets/weather/widgets/WeatherForcastWidget/settings'
import { WeatherSettingsFormSchema } from '@/components/widgets/weather/widgets/WeatherWidget/settings'
import { WidgetComponentWrapper } from '@/models/widgetComponentWrapper'
import { NamedLocation } from '@/models/namedLocation'
import { GpsLocation } from '@/models/gpsLocation'

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
