import { string } from 'yup'
import { BaseInputV2, FormField } from '@/atoms'

export enum TwitterWidgetSetting {
  TAG = 'TAG',
  TITLE = 'TITLE'
}

export const TwitterWidgetFormSchema = {
  fields: [
    new FormField(
      BaseInputV2,
      'Hashtag',
      TwitterWidgetSetting.TAG,
      string().required()
    ),
    new FormField(BaseInputV2, 'Titel', TwitterWidgetSetting.TITLE, string())
  ]
}
