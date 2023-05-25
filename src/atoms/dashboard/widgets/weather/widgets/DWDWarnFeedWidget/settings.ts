import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import LocationCoordinateSelect from '@/atoms/inputs/LocationCoordinateSelect/LocationCoordinateSelect.vue'

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
