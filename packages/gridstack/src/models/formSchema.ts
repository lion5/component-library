import { Schema } from 'yup'
import { defineComponent, markRaw } from 'vue'

/**
 * A form field represents a form input (not just the input element)
 */
export class FormField {
  /**
   * The input component to render. Input components need to implement the required props name, label, rules and can have additionalProps like type, options, etc.
   * They also need to use the Field and ErrorMessage components or the useField composable of vee-validate to be fully functional.
   * See {@link https://vee-validate.logaretm.com/v4/api/field/ Field}, {@link https://vee-validate.logaretm.com/v4/api/error-message/ ErrorMessage} and
   * {@link https://vee-validate.logaretm.com/v4/api/use-field/ useField}
   */
  readonly is: ReturnType<typeof defineComponent>
  /**
   * Input field label
   */
  readonly label: string
  /**
   * The input name. This should be in sync with the settings key to get correctly resolved
   */
  readonly name: string
  /**
   * The form validation rules using [yup](https://github.com/jquense/yup)
   */
  readonly rules: Schema | undefined
  /**
   * Additional props that the component needs, like type or options
   */
  readonly additionalProps: object

  constructor(
    is: ReturnType<typeof defineComponent>,
    label: string,
    name: string,
    rules: Schema | undefined,
    additionalProps: object = {}
  ) {
    // reactive components can lead to unnecessary performance overhead and should be avoided. Therefore, the reactivity is removed here
    this.is = markRaw(is)
    this.label = label
    this.name = name
    this.rules = rules
    this.additionalProps = additionalProps
  }
}

/**
 * The form schema is used to auto generate simple forms.
 */
export class FormSchema {
  readonly fields: FormField[]

  constructor(fields: FormField[]) {
    this.fields = fields
  }

  static isEmpty(formSchema: FormSchema) {
    return formSchema.fields.length === 0
  }
}
