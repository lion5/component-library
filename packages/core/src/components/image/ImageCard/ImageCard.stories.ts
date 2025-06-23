import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ImageSizes } from '@core/models/image/imageSizes'
import { ImageResponse } from '@core/models/image/imageResponse'

/**
 * This is the base image card component. It displays a modal on click with the image in full size.
 */
export default {
  component: ImageCard,
  title: 'Display Components/Image/ImageCard',
} as Meta<typeof ImageCard>
type Story = StoryObj<typeof ImageCard>

const Template = (args: unknown) => ({
  components: { ImageCard },
  setup() {
    return { args }
  },
  template: `<div style="display: flex;"><ImageCard v-bind="args" /></div>`
})

export const Default: Story = {
  render: Template,
  args: {
    image: new ImageResponse(
      undefined,
      "Default Image",
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    aspectRatio: '4/3',
  }
}
