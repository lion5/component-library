import { string } from 'yup'
import { FormField, FormSchema } from '@gridstack/models/formSchema'
import { BaseInputV2 } from '@lion5/component-library'

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
