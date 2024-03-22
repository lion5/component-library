import type { defineComponent } from 'vue'
import { markRaw } from 'vue'
import { FormSchema } from '@gridstack/models/formSchema'
import { WidgetSettings } from '@gridstack/models/widgetConfiguration'

/**
 * Wraps the widget name together with its vue component.
 */
export class WidgetComponentWrapper {
  /**
   * The widget name. Mainly used if the widget is in edit mode
   */
  readonly name: string
  /**
   * The widget single file component
   */
  readonly component: ReturnType<typeof defineComponent>
  /**
   * The default settings of the widget
   */
  readonly defaultSettings: WidgetSettings
  /**
   * The form schema used to generate the settings form
   */
  readonly formSchema: FormSchema

  constructor(
    name: string,
    component: ReturnType<typeof defineComponent>,
    defaultSettings: WidgetSettings = new Map(),
    formSchema: FormSchema = new FormSchema([])
  ) {
    this.name = name
    // reactive components can lead to unnecessary performance overhead and should be avoided. Therefore, the reactivity is removed here
    this.component = markRaw(component)
    this.defaultSettings = defaultSettings
    this.formSchema = formSchema
  }
}
