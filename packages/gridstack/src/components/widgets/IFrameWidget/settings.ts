import { string } from 'yup'
import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import BaseInputV2 from '@/atoms/inputs/BaseInputV2/BaseInputV2.vue'

export enum IFrameSetting {
  SRC = 'src',
  TITLE = 'TITLE'
}

export const IFrameSettingsFormSchema = new FormSchema([
  new FormField(
    BaseInputV2,
    'Website Url',
    IFrameSetting.SRC,
    string().required()
  ),
  new FormField(BaseInputV2, 'Titel', IFrameSetting.TITLE, string())
])
