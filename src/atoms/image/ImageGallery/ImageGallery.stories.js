import ImageGallery from '@/base/components/image/ImageGallery/ImageGallery.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { Gallery } from '@/base/models/gallery'

export default {
  title: 'molecules/ImageGallery',
  component: ImageGallery
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageGallery },
  template: '<ImageGallery v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  gallery: new Gallery([
    new PortalImage(1, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
    new PortalImage(2, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
    new PortalImage(3, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
    new PortalImage(4, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
    new PortalImage(5, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
    new PortalImage(6, 'alt', undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'))
  ]),
  aspectRatio: '4/3'
}
