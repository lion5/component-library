import { Meta, StoryObj } from '@storybook/vue3-vite'
import BaseImage from './BaseImage.vue'
import { MinimalImage } from '../models/minimalImage'

/**
 * BaseImage gives you control over an image. The styling can be configured via different css custom props
 * - use `--image-aspect-ratio` to define the aspect ratio of the image. Default: `unset`
 * - use `--image-object-fit` to configure object fit of the image. Default: `contain`
 * - use `--image-object-position` to configure the image position if over scaled. Default: `center`
 * - use `--image-width` to configure the width. Default: `100%`
 * - use `--image-height` to configure the image height. Default: `100%`
 */
export default {
  component: BaseImage,
  title: 'Display Components/Image/BaseImage'
} as Meta<typeof BaseImage>
type Story = StoryObj<typeof BaseImage>

/**
 * The image will be rendered in maximum size.
 */
export const Default: Story = {
  args: {
    image: new MinimalImage(1, 'alt', 'https://dummyimage.com/400x300/d4d4d4/fff.png')
  }
}

/**
 * Use the `--image-aspect-ratio` css custom property to define the aspect ratio of the image.
 */
export const AspectRatio16To9: Story = {
  render: (args: unknown) => ({
    components: { BaseImage },
    setup() {
      return { args }
    },
    template: `<BaseImage v-bind="args" style="--image-aspect-ratio: 16 / 9" />`
  }),
  args: {
    image: new MinimalImage(1, 'alt', 'https://dummyimage.com/400x300/d4d4d4/fff.png')
  }
}

/**
 * Use the `--image-object-fit` css custom property to configure object fit of the image.
 * In this example the image will be scaled to cover the whole 16 / 9 area.
 */
export const ObjectFitCover: Story = {
  render: (args: unknown) => ({
    components: { BaseImage },
    setup() {
      return { args }
    },
    template: `<BaseImage v-bind="args" style="--image-aspect-ratio: 16 / 9; --image-object-fit: cover" />`
  }),
  args: {
    image: new MinimalImage(1, 'alt', 'https://dummyimage.com/400x300/d4d4d4/fff.png')
  }
}
