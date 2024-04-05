export type BrightSkyCondition =
  | 'dry'
  | 'fog'
  | 'rain'
  | 'sleet'
  | 'snow'
  | 'hail'
  | 'thunderstorm'
  | null

export interface BrightSkyCurrentWeather {
  weather: BrightSkyWeather
  sources: BrightSkySource[]
}

export interface BrightSkyWeather {
  timestamp: string
  icon: string | null
  temperature: number | null
  relative_humidity: number | null
  wind_direction_10: number | null
  wind_speed_10: number | null
  wind_gust_direction_10: number | null
  wind_gust_speed_10: number | null
  precipitation_10: number | null
  condition: BrightSkyCondition
}

export interface BrightSkySource {
  id: number
  station_name: string
}
