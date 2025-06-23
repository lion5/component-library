import { action } from 'storybook/actions'
import { Form } from 'vee-validate'
import { BaseButton } from '../src'

export const formWrapper = (story: unknown, { args }) => {
  return {
    components: { story, Form, BaseButton },
    setup() {
      const onSubmit = action('submit')
      return {
        onSubmit,
        initialValues: args.initialValues,
        initialTouched: args.initialTouched,
        validateOnMount: args.validateOnMount,
        initialErrors: args.initialErrors
      }
    },
    template: `
      <Form
        :initialValues='initialValues'
        :initialTouched='initialTouched'
        :validateOnMount='validateOnMount'
        :initialErrors='initialErrors'
        @submit="onSubmit"
      >
        <story />
        <BaseButton type="submit">Submit</BaseButton>
      </Form>`
  }
}
