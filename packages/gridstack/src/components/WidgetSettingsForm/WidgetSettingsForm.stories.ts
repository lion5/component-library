import { Meta, StoryObj } from '@storybook/vue3-vite'
import WidgetSettingsForm from '@/components/WidgetSettingsForm/WidgetSettingsForm.vue'
import { FormField, FormSchema } from '@/models/formSchema'
import {
  BaseInputV2Validated,
  BaseSelect,
  NumberInputValidated,
  SelectOption
} from '@lion5/component-library'
import { number, string } from 'yup'
import { WidgetSetting } from '@/models/widgetConfiguration'
import { action } from 'storybook/actions'

/**
 * This component is used to generate the widgets edit form dynamically based on a form schema.
 * All vee validate compatible inputs can be used. The validation is provided by yup.
 */
export default {
  component: WidgetSettingsForm
} as Meta<typeof WidgetSettingsForm>
type Story = StoryObj<typeof WidgetSettingsForm>

export const Empty: Story = {
  render: (args: unknown) => ({
    components: { WidgetSettingsForm },
    setup() {
      const updateSettings = action('update:settings')
      return { args, updateSettings }
    },
    template: `
      <WidgetSettingsForm v-bind='args' @update:settings='updateSettings' />`
  }),
  args: {
    settings: new Map(),
    defaultSettings: new Map(),
    schema: new FormSchema([
      new FormField(BaseInputV2Validated, 'First Input', 'input1', string().required()),
      new FormField(
        BaseInputV2Validated,
        'Password Input',
        'input2',
        string().required(),
        {
          type: 'password'
        }
      ),
      new FormField(BaseSelect, 'Select Input', 'input3', string().required(), {
        options: [
          new SelectOption('key1', 'Option 1'),
          new SelectOption('key2', 'Option 2'),
          new SelectOption('key3', 'Option 3')
        ]
      }),
      new FormField(NumberInputValidated, 'Number Input', 'input4', number().required())
    ])
  }
}

export const WithDefaultSettings: Story = {
  render: Empty.render,
  args: {
    ...Empty.args,
    defaultSettings: new Map<string, WidgetSetting>([
      ['input1', 'text input'],
      ['input2', 'password input'],
      ['input3', 'key1'],
      ['input4', 42]
    ])
  }
}

export const WithSettingsSet: Story = {
  render: Empty.render,
  args: {
    ...WithDefaultSettings.args,
    settings: new Map<string, WidgetSetting>([
      ['input1', 'custom text input'],
      ['input2', 'custom password input'],
      ['input3', 'key3'],
      ['input4', 72]
    ])
  }
}
