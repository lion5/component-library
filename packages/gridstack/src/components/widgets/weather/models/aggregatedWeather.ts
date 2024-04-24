import { countBy, last, maxBy } from 'lodash-es'
import { BrightSkyForecastWeatherItem } from '@/components/widgets/weather/models/brightSkyForecastWeather'

export class AggregatedWeather {
  readonly date: Date
  readonly icon: string | null
  readonly minTemperature: number | null
  readonly maxTemperature: number | null
  readonly maxWindSpeed: number | null
  readonly maxWindSpeedDirection: number | null

  constructor(
    date: Date,
    icon: string | null,
    minTemperature: number | null,
    maxTemperature: number | null,
    maxWindSpeed: number | null,
    maxWindSpeedDirection: number | null
  ) {
    this.date = date
    this.icon = icon
    this.minTemperature = minTemperature
    this.maxTemperature = maxTemperature
    this.maxWindSpeed = maxWindSpeed
    this.maxWindSpeedDirection = maxWindSpeedDirection
  }

  static fromBrightSkyData(
    date: Date,
    forecasts: BrightSkyForecastWeatherItem[]
  ) {
    const icons = forecasts.map((forecast) => forecast.icon)
    const mostFrequentIcon = maxBy(Object.entries(countBy(icons)), last) || []
    const icon = mostFrequentIcon[0] || null
    const temperatures = forecasts
      .map((forecast) => forecast.temperature)
      .filter((temperature) => temperature != null) as number[]
    const maxWindSpeedForecast = maxBy(
      forecasts,
      (forecast) => forecast.wind_speed
    )
    return new AggregatedWeather(
      date,
      icon,
      Math.min(...temperatures),
      Math.max(...temperatures),
      maxWindSpeedForecast?.wind_speed || null,
      maxWindSpeedForecast?.wind_direction || null
    )
  }
}
