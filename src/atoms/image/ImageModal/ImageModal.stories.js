import ImageModal from '@/base/components/image/ImageModal/ImageModal.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'

export default {
  title: 'molecules/ImageModal',
  component: ImageModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageModal },
  template: '<ImageModal v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  value: true,
  image: new PortalImage(undefined, undefined, undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
  aspectRatio: '4/3'
}
