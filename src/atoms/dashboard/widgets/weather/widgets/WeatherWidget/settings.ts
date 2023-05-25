import { FormField, FormSchema, LocationCoordinateSelect } from '@/atoms'

export enum WeatherSetting {
  LOCATION = 'LOCATION'
}

export const WeatherSettingsFormSchema = new FormSchema([
  new FormField(
    LocationCoordinateSelect,
    'Ort',
    WeatherSetting.LOCATION,
    undefined // TODO: required
  )
])
