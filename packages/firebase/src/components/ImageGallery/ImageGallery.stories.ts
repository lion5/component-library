import { Meta, StoryObj } from '@storybook/vue3'
import ImageGallery from './ImageGallery.vue'

export default {
  component: ImageGallery
} as Meta<typeof ImageGallery>
type Story = StoryObj<typeof ImageGallery>

export const Default: Story = {
  render: (args) => ({
    components: { ImageGallery },
    setup() {
      return { args }
    },
    template: '<ImageGallery v-bind="args" />'
  }),
  args: {
    storageUrls: [
      'https://picsum.photos/200',
      'https://picsum.photos/200',
      'https://picsum.photos/200'
    ]
  }
}
