import { Meta, StoryObj } from '@storybook/vue3'
import { Form } from 'vee-validate'
import SliderToggleInput from './SliderToggleInput.vue'

export default {
  component: SliderToggleInput
} as Meta<typeof SliderToggleInput>
type Story = StoryObj<typeof SliderToggleInput>

export const Empty: Story = {
  args: {
    name: 'sliderToggle',
    label: 'This is a toggleable input'
  }
}

export const Checked: Story = {
  render: (args: unknown) => ({
    components: { SliderToggleInput, Form },
    setup() {
      return { args }
    },
    template: `
      <Form :initialValues='{sliderToggle: true}'>
      <SliderToggleInput v-bind='args' />
      </Form>`
  }),
  args: {
    ...Empty.args,
    name: 'sliderToggle'
  }
}
