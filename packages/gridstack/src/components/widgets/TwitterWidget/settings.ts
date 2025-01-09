import { string } from 'yup'
import { FormField } from '@/models/formSchema'
import { BaseInputV2Validated } from '@lion5/component-library'

export enum TwitterWidgetSetting {
  TAG = 'TAG',
  TITLE = 'TITLE'
}

export const TwitterWidgetFormSchema = {
  fields: [
    new FormField(
      BaseInputV2Validated,
      'Hashtag',
      TwitterWidgetSetting.TAG,
      string().required()
    ),
    new FormField(BaseInputV2Validated, 'Titel', TwitterWidgetSetting.TITLE, string())
  ]
}
