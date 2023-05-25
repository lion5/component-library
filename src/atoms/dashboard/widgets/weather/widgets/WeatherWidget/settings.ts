import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import LocationCoordinateSelect from '@/atoms/inputs/LocationCoordinateSelect/LocationCoordinateSelect.vue'

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
