import { string } from 'yup'
import { FormField } from '@/models/formSchema'
import { BaseInputV2 } from '@lion5/component-library'

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
