import { string } from 'yup'
import { FormField, FormSchema } from '@/atoms/dashboard/models/formSchema'
import BaseInputV2 from '@/atoms/inputs/BaseInputV2/BaseInputV2.vue'

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
    BaseInputV2,
    'Greeting',
    TemplateWidgetSetting.GREETING,
    string().required()
  )
])
