import { Meta, StoryObj } from '@storybook/vue3'
import PreviewImageInput from './PreviewImageInput.vue'
import { ref } from 'vue'

export default {
  component: PreviewImageInput
} as Meta<typeof PreviewImageInput>
type Story = StoryObj<typeof PreviewImageInput>

export const Empty: Story = {
  render: (args: any) => ({
    components: { PreviewImageInput },
    setup() {
      const image = ref<File | undefined>()
      return { args, image }
    },
    template: `
      <PreviewImageInput v-bind='args' v-model='image' />`
  }),
  args: {
    name: 'image-input1',
    label: 'This is an example number field'
  }
}
