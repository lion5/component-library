import { string } from 'yup'
import { FormField, FormSchema } from '@/models/formSchema'
import { BaseInputV2Validated } from '@lion5/component-library'

/**
 * Contains keys of all settings. These are used to add, update and retrieve the settings from the settings map.
 */
export enum TemplateWidgetSetting {
  EXAMPLE = 'EXAMPLE',
  GREETING = 'GREETING'
}

/**
 * This form schema is used to generate the widget settings form.
 */
export const TemplateWidgetSettingsFormSchema = new FormSchema([
  new FormField(
    BaseInputV2Validated,
    'Greeting',
    TemplateWidgetSetting.GREETING,
    string().required()
  )
])
