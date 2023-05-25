import { number, string } from 'yup'
import { FormField } from '@/atoms/dashboard/models/formSchema'
import BaseInputV2 from '@/atoms/inputs/BaseInputV2/BaseInputV2.vue'
import NumberInput from '@/atoms/inputs/NumberInput/NumberInput.vue'

export enum RefreshableImageSetting {
  SRC = 'src',
  TITLE = 'TITLE',
  REFRESH_INTERVAL_SECONDS = 'REFRESH_INTERVAL_SECONDS'
}

export const RefreshableImageSettingsFormSchema = {
  fields: [
    new FormField(
      BaseInputV2,
      'Bild-Url',
      RefreshableImageSetting.SRC,
      string()
    ),
    new FormField(
      BaseInputV2,
      'Bildtitel',
      RefreshableImageSetting.TITLE,
      string()
    ),
    new FormField(
      NumberInput,
      'Aktualisierungsintervall',
      RefreshableImageSetting.REFRESH_INTERVAL_SECONDS,
      number(),
      {
        type: 'number'
      }
    )
  ]
}
