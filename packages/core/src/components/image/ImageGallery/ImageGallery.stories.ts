import { ImageSizes } from '@core/models/image/imageSizes'
import ImageGallery from '@core/components/image/ImageGallery/ImageGallery.vue'
import { Meta, StoryObj } from '@storybook/vue3'
import { Gallery } from '@core/models/image/gallery'
import { ImageResponse } from '@core/models/image/imageResponse'

/**
 * This all given images as cards in a grid layout.
 */
export default {
  component: ImageGallery,
  title: 'Display Components/Image/ImageGallery',
} as Meta<typeof ImageGallery>
type Story = StoryObj<typeof ImageGallery>

export const Default: Story = {
  args: {
    gallery: new Gallery([
      new ImageResponse(
        1,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      ),
      new ImageResponse(
        2,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      ),
      new ImageResponse(
        3,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      ),
      new ImageResponse(
        4,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      ),
      new ImageResponse(
        5,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      ),
      new ImageResponse(
        6,
        'alt',
        new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
      )
    ]),
    aspectRatio: '4/3'
  }
}
