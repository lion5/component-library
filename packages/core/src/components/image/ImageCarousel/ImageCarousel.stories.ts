import ImageCarousel from './ImageCarousel.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import { MinimalImage } from '../models/minimalImage'
import { ref } from 'vue'

/**
 * The image carousel component displays a carousel of images.
 * If the end of the images is reached, the carousel will start from the beginning.
 * The carousel can be controlled via the arrow buttons, by swiping on touch devices or using the left and right keyboard key.
 */
export default {
  component: ImageCarousel,
  title: 'Display Components/Image/ImageCarousel',
} as Meta<typeof ImageCarousel>
type Story = StoryObj<typeof ImageCarousel>

export const DefaultWithDifferentAspectRatios: Story = {
  render: (args: unknown) => ({
    components: { ImageCarousel },
    setup() {
      const selectedImage = ref(new MinimalImage(
        1,
        'alt',
        'https://dummyimage.com/2000x1000/ff0000/fff.png'
      ))
      return { args, selectedImage }
    },
    template: '<ImageCarousel v-bind="args" v-model:selected-image="selectedImage" />'
  }),
  args: {
    images: [
      new MinimalImage(
        1,
        'alt',
        'https://dummyimage.com/2000x1000/ff0000/fff.png'
      ),
      new MinimalImage(
        2,
        'alt',
        'https://dummyimage.com/2000x2000/aa0000/fff.png'
      ),
      new MinimalImage(
        3,
        'alt',
        'https://dummyimage.com/2000x1000/990000/fff.png'
      ),
      new MinimalImage(
        4,
        'alt',
        'https://dummyimage.com/2000x500/880000/fff.png'
      ),
      new MinimalImage(
        5,
        'alt',
        'https://dummyimage.com/2000x1000/770000/fff.png'
      ),
      new MinimalImage(
        6,
        'alt',
        'https://dummyimage.com/2000x1000/660000/fff.png'
      ),
      new MinimalImage(
        7,
        'alt',
        'https://dummyimage.com/2000x1000/550000/fff.png'
      ),
      new MinimalImage(
        8,
        'alt',
        'https://dummyimage.com/2000x1000/440000/fff.png'
      ),
      new MinimalImage(
        9,
        'alt',
        'https://dummyimage.com/2000x1000/330000/fff.png'
      ),
      new MinimalImage(
        10,
        'alt',
        'https://dummyimage.com/2000x1000/220000/fff.png'
      )
    ]
  }
}
