import { Meta, StoryObj } from '@storybook/vue3'
import ImageEditCard from './ImageEditCard.vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ImageSizes } from '../../../../models/image/imageSizes'
import { ImageConstraints } from '../../../../models/image/imageConstraints'

/**
 * Card to edit and delete images. It can display error, busy and published states.
 */
export default {
  component: ImageEditCard,
  title: 'Input Components/ImageEditCard'
} as Meta<typeof ImageEditCard>
type Story = StoryObj<typeof ImageEditCard>

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

const Template = (args: unknown) => ({
  components: { ImageEditCard },
  setup() {
    return { args }
  },
  template:
    '<div style="max-width: 250px;"><ImageEditCard v-bind="args" /></div>'
})

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
