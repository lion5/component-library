import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ImageSizes } from '@core/models/image/imageSizes'
import ImageThumbCarousel from './ImageThumbCarousel.vue'
import { MultiScaleImage } from '../models/multiScaleImage'

export default {
  component: ImageThumbCarousel,
  title: 'Display Components/Image/ImageThumbCarousel'
} as Meta<typeof ImageThumbCarousel>
type Story = StoryObj<typeof ImageThumbCarousel>

export const DefaultWithDifferentAspectRatios: Story = {
  render: (args: unknown) => ({
    components: { ImageThumbCarousel },
    setup() {
      return { args }
    },
    template: '<ImageThumbCarousel v-bind="args" />'
  }),
  args: {
    images: [
      new MultiScaleImage(
        1,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        2,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x2000/d4d4d4/fff.png',
          'https://dummyimage.com/200x200/d4d4d4/fff.png',
          'https://dummyimage.com/400x400/d4d4d4/fff.png',
          'https://dummyimage.com/800x800/d4d4d4/fff.png',
          'https://dummyimage.com/1600x1600/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        3,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        4,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x500/d4d4d4/fff.png',
          'https://dummyimage.com/200x50/d4d4d4/fff.png',
          'https://dummyimage.com/400x100/d4d4d4/fff.png',
          'https://dummyimage.com/800x200/d4d4d4/fff.png',
          'https://dummyimage.com/1600x400/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        5,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        6,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        7,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        8,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        9,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      ),
      new MultiScaleImage(
        10,
        'alt',
        new ImageSizes(
          'https://dummyimage.com/2000x1000/d4d4d4/fff.png',
          'https://dummyimage.com/200x100/d4d4d4/fff.png',
          'https://dummyimage.com/400x200/d4d4d4/fff.png',
          'https://dummyimage.com/800x400/d4d4d4/fff.png',
          'https://dummyimage.com/1600x800/d4d4d4/fff.png'
        )
      )
    ]
  }
}
