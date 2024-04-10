import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import { Gallery } from '@core/components/image/models/gallery'
import ImageGallery from '@core/components/image/ImageGallery/ImageGallery.vue'

export default {
  component: ImageGallery
}

const Template = (args) => ({
  components: { ImageGallery },
  setup() {
    return { args }
  },
  template: '<ImageGallery v-bind="args" />'
})

export const Default = Template.bind({})
Default.args = {
  gallery: new Gallery([
    new PortalImage(
      1,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    new PortalImage(
      2,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    new PortalImage(
      3,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    new PortalImage(
      4,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    new PortalImage(
      5,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    new PortalImage(
      6,
      'alt',
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    )
  ]),
  aspectRatio: '4/3'
}
