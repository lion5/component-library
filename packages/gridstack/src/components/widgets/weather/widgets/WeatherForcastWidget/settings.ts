import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import LocationCoordinateSelect from '@/atoms/inputs/LocationCoordinateSelect/LocationCoordinateSelect.vue'

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
