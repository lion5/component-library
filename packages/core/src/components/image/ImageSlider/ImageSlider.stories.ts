import ImageSlider from './ImageSlider.vue'
import { MinimalImage } from '../models/minimalImage'
import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: ImageSlider
} as Meta<typeof ImageSlider>
type Story = StoryObj<typeof ImageSlider>

export const DefaultWithDifferentAspectRatios: Story = {
  render: (args: unknown) => ({
    components: { ImageSlider },
    setup() {
      const selectedImage = ref()
      return { args, selectedImage }
    },
    template: '<ImageSlider v-bind="args" v-model:selected-image="selectedImage" />'
  }),
  args: {
    images: [
      new MinimalImage(
        1,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        2,
        'alt',
        'https://dummyimage.com/100x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        3,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        4,
        'alt',
        'https://dummyimage.com/800x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        5,
        'alt',
        'https://dummyimage.com/200x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        6,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        7,
        'alt',
        'https://dummyimage.com/800x300/d4d4d4/fff.png'
      )
    ]
  }
}

export const WithAspectRatio = {
  render: (args) => ({
    components: { ImageSlider },
    setup() {
      const selectedImage = ref()
      return { args, selectedImage }
    },
    template:
      '<ImageSlider v-bind="args" style="--image-aspect-ratio: 16 / 9; --image-object-fit: cover" v-model="selectedImage"/>'
  }),
  args: {
    images: [
      new MinimalImage(
        1,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        2,
        'alt',
        'https://dummyimage.com/100x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        3,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        4,
        'alt',
        'https://dummyimage.com/800x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        5,
        'alt',
        'https://dummyimage.com/200x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        6,
        'alt',
        'https://dummyimage.com/400x300/d4d4d4/fff.png'
      ),
      new MinimalImage(
        7,
        'alt',
        'https://dummyimage.com/800x300/d4d4d4/fff.png'
      )
    ]
  }
}
