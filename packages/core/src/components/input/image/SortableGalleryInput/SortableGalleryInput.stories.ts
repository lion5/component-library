import { Meta, StoryObj } from '@storybook/vue3-vite'
import SortableGalleryInput from './SortableGalleryInput.vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ref } from 'vue'
import { ImageSizes } from '@core/models/image/imageSizes'
import { ImageConstraints } from '../../../../models/image/imageConstraints'
import { GalleryForm } from '../../../../models/image/galleryForm'

/**
 * Gallery component to add, edit, sort and remove the gallery.
 * It supports drop files to add images and sorting with drag and drop.
 */
export default {
  component: SortableGalleryInput,
  title: 'Input Components/SortableGalleryInput'
} as Meta<typeof SortableGalleryInput>
type Story = StoryObj<typeof SortableGalleryInput>

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
  components: { SortableGalleryInput },
  setup() {
    const gallery = ref<GalleryForm>(
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
  template: '<SortableGalleryInput v-bind="args" :gallery="gallery" />'
})

export const Default: Story = {
  render: Template,
  args: {
    imageConstraints: new ImageConstraints([], '4/3')
  }
}
