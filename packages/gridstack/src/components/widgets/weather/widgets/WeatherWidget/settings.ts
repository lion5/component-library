import { LocationCoordinateSelect } from '@lion5/component-library'
import { FormField, FormSchema } from '@gridstack/models/formSchema'

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
