import { Meta, StoryObj } from '@storybook/vue3'
import PreviewImageInput from './PreviewImageInputValidated.vue'
import { ref } from 'vue'
import { Form } from 'vee-validate'

export default {
  component: PreviewImageInput
} as Meta<typeof PreviewImageInput>
type Story = StoryObj<typeof PreviewImageInput>

export const Empty: Story = {
  render: (args: unknown) => ({
    components: { PreviewImageInput, Form },
    setup() {
      const image = ref<File | undefined>()
      return { args, image }
    },
    template: `
      <Form>
      <PreviewImageInput v-bind='args' v-model='image' />
      </Form>`
  }),
  args: {
    name: 'image-input1',
    label: 'This is an example number field'
  }
}
