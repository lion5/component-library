import { Meta, StoryObj } from '@storybook/vue3-vite'
import { ImageForm } from '../../../../models/image/imageForm'
import { ref } from 'vue'
import ImageGalleryInput from './GalleryInput.vue'
import { ImageSizes } from '../../../../models/image/imageSizes'
import { GalleryForm } from '../../../../models/image/galleryForm'
import { ImageConstraints } from '../../../../models/image/imageConstraints'

/**
 * Gallery component to add, edit, sort and remove the gallery.
 * It supports drop files to add images and sorting with drag and drop.
 */
export default {
  component: ImageGalleryInput,
  title: 'Input Components/GalleryInput'
} as Meta<typeof ImageGalleryInput>
type Story = StoryObj<typeof ImageGalleryInput>

function getDummyImage(busy: boolean = false, published: boolean = false, errors: Error[] = []) {
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
  components: { ImageGalleryInput },
  setup() {
    const gallery = ref(
      new GalleryForm([
        getDummyImage(),
        getDummyImage(),
        getDummyImage(true),
        getDummyImage(true),
        getDummyImage(false, true),
        getDummyImage(false, true),
        getDummyImage(false, false, [new Error('Fehler')]),
        getDummyImage(false, false, [new Error('Fehler')])
      ])
    )
    return { args, gallery }
  },
  template: '<ImageGalleryInput v-bind="args" v-model:gallery="gallery" />'
})

export const Default: Story = {
  render: Template,
  args: {
    imageConstraints: new ImageConstraints(undefined, '4/3')
  }
}
