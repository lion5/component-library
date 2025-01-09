import { number, string } from 'yup'
import { FormField } from '@/models/formSchema'
import { BaseInputV2Validated, NumberInputValidated } from '@lion5/component-library'

export enum RefreshableImageSetting {
  SRC = 'src',
  TITLE = 'TITLE',
  REFRESH_INTERVAL_SECONDS = 'REFRESH_INTERVAL_SECONDS'
}

export const RefreshableImageSettingsFormSchema = {
  fields: [
    new FormField(
      BaseInputV2Validated,
      'Bild-Url',
      RefreshableImageSetting.SRC,
      string()
    ),
    new FormField(
      BaseInputV2Validated,
      'Bildtitel',
      RefreshableImageSetting.TITLE,
      string()
    ),
    new FormField(
      NumberInputValidated,
      'Aktualisierungsintervall',
      RefreshableImageSetting.REFRESH_INTERVAL_SECONDS,
      number(),
      {
        type: 'number'
      }
    )
  ]
}
