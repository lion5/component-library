import { FormField, FormSchema, LocationCoordinateSelect } from '@/atoms'

export enum WeatherForecastSetting {
  LOCATION = 'LOCATION'
}

export const WeatherForecastSettingsFormSchema = new FormSchema([
  new FormField(
    LocationCoordinateSelect,
    'Ort',
    WeatherForecastSetting.LOCATION,
    undefined // TODO: required
  )
])
