import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/vue3'
import ImageEditCardDraggable from './ImageEditCardDraggable.vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ImageSizes } from '@core/models/image/imageSizes'
import { ImageConstraints } from '@core/models/image/imageConstraints'

/**
 * This combines the {@link ImageEditCard} with the {@link DraggableItem}.
 */
export default {
  component: ImageEditCardDraggable,
  title: 'Input Components/ImageEditCardDraggable'
} as Meta<typeof ImageEditCardDraggable>
type Story = StoryObj<typeof ImageEditCardDraggable>

const Template = (args: unknown) => ({
  components: { ImageEditCardDraggable },
  setup() {
    const drag = action('drag')
    const drop = action('drop')
    const input = action('input')
    return { args, drag, drop, input }
  },
  template:
    '<div style="max-width: 250px;"><ImageEditCardDraggable v-bind="args" @drag="drag" @drop="drop" @input="input"/></div>'
})

function getDummyImage(
  busy: boolean = false,
  published: boolean = false,
  errors = []
) {
  const metadata = {
    type: 'image/jpeg'
  }
  return new ImageForm(
    published ? 4711 : -1,
    '',
    new File([''], 'test.jpg', metadata),
    new Image(1200, 900),
    new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'),
    busy,
    false,
    errors
  )
}

export const Local: Story = {
  render: Template,
  args: {
    image: getDummyImage(),
    imageConstraints: new ImageConstraints([], '4/3')
  }
}

export const Busy: Story = {
  render: Template,
  args: {
    image: getDummyImage(true),
    imageConstraints: new ImageConstraints([], '4/3')
  }
}

export const Published: Story = {
  render: Template,
  args: {
    image: getDummyImage(false, true),
    imageConstraints: new ImageConstraints([], '4/3')
  }
}

export const Errors: Story = {
  render: Template,
  args: {
    image: getDummyImage(),
    imageConstraints: new ImageConstraints([], '4/3', 123)
  }
}
