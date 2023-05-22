import { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import UploadImageFAB from './UploadImageFAB.vue'

export default {
  component: UploadImageFAB
} as Meta<typeof UploadImageFAB>
type Story = StoryObj<typeof UploadImageFAB>

export const Empty: Story = {
  render: (args: any) => ({
    components: { UploadImageFAB },
    setup() {
      const image = ref<File | undefined>()
      return { args, image }
    },
    template: `
      <UploadImageFAB v-bind='args' v-model='image' />`
  }),
  args: {
    name: 'image-input1',
    label: 'This is an example number field'
  }
}
