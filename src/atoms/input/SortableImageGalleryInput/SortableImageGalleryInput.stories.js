import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { ImageConstraints } from '@/base/models/imageConstraints'
import { Gallery } from '@/base/models/gallery'
import SortableImageGalleryInput from '@/base/components/input/SortableImageGalleryInput/SortableImageGalleryInput.vue'

export default {
  title: 'molecules/input/SortableImageGalleryInput',
  component: SortableImageGalleryInput
}

function getDummyImage (busy, published, errors = []) {
  const metadata = {
    type: 'image/jpeg'
  }
  return new PortalImage(published ? 4711 : -1, '', new File([''], 'test.jpg', metadata), new Image(1200, 900), new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'), busy, false, errors)
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).filter((x) => x !== 'value'),
  components: { SortableImageGalleryInput },
  data () {
    return {
      value: new Gallery([
        getDummyImage(),
        getDummyImage(),
        getDummyImage(true),
        getDummyImage(true),
        getDummyImage(false, true),
        getDummyImage(false, true),
        getDummyImage(false, false, [new Error('Fehler')]),
        getDummyImage(false, false, [new Error('Fehler')])
      ])
    }
  },
  template: '<SortableImageGalleryInput v-bind="$props" v-model="value" />'
})

export const Default = Template.bind({})
Default.args = {
  imageConstraints: new ImageConstraints(undefined, '4/3')
}
