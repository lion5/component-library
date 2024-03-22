import { FormField, FormSchema } from '@gridstack/models/formSchema'
import { LocationCoordinateSelect } from '@lion5/component-library'

export enum WeatherWarnSetting {
  LOCATION = 'LOCATION'
}

export const WeatherWarnSettingsFormSchema = new FormSchema([
  new FormField(
    LocationCoordinateSelect,
    'Ort',
    WeatherWarnSetting.LOCATION,
    undefined // TODO: required
  )
])
