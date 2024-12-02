import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import { Meta, StoryObj } from '@storybook/vue3'

/**
 * This is the base image card component. It displays a modal on click with the image in full size.
 */
export default {
  component: ImageCard
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
    image: new PortalImage(
      undefined,
      undefined,
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    aspectRatio: '4/3'
  }
}
