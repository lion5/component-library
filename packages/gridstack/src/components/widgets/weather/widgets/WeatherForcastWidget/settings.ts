import { FormField, FormSchema } from '@/models/formSchema'
import { LocationCoordinateSelect } from '@lion5/component-library'

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
