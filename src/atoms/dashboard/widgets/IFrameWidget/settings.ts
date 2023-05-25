import { string } from 'yup'
import { BaseInputV2, FormField } from '@/atoms'

export enum IFrameSetting {
  SRC = 'src',
  TITLE = 'TITLE'
}

export const IFrameSettingsFormSchema = {
  fields: [
    new FormField(
      BaseInputV2,
      'Website Url',
      IFrameSetting.SRC,
      string().required()
    ),
    new FormField(BaseInputV2, 'Titel', IFrameSetting.TITLE, string())
  ]
}
