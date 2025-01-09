import { string } from 'yup'
import { FormField, FormSchema } from '@/models/formSchema'
import { BaseInputV2Validated } from '@lion5/component-library'

export enum IFrameSetting {
  SRC = 'src',
  TITLE = 'TITLE'
}

export const IFrameSettingsFormSchema = new FormSchema([
  new FormField(
    BaseInputV2Validated,
    'Website Url',
    IFrameSetting.SRC,
    string().required()
  ),
  new FormField(BaseInputV2Validated, 'Titel', IFrameSetting.TITLE, string())
])
