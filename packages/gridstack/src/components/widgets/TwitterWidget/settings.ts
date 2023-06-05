import { string } from 'yup'
import { FormField } from '@/atoms/dashboard/models/formSchema'
import BaseInputV2 from '@/atoms/inputs/BaseInputV2/BaseInputV2.vue'

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
