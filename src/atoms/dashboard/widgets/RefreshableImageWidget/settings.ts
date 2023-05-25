import { number, string } from 'yup'
import { BaseInputV2, FormField, NumberInput } from '@/atoms'

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
