import type {
  BrightSkyCondition,
  BrightSkySource
} from '@gridstack/components/widgets/weather/models/brightSkyCurrentWeather'

export interface BrightSkyForecastWeatherItem {
  timestamp: string
  icon: string | null
  temperature: number | null
  relative_humidity: number | null
  wind_direction: number | null
  wind_speed: number | null
  dew_point: number | null
  wind_gust_direction_10: number | null
  wind_gust_speed_10: number | null
  precipitation: number | null
  precipitation_probability: number | null
  condition: BrightSkyCondition
}

export interface BrightSkyForecastWeather {
  weather: BrightSkyForecastWeatherItem[]
  sources: BrightSkySource[]
}
