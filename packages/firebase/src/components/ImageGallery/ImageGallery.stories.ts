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
      'gs://smart-city-digimap.appspot.com/6527d363d8cddb6cecf60817/reports/1700572644182'
    ]
  }
}
