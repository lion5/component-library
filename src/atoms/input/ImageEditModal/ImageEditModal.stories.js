import ImageEditModal from '@/base/components/input/ImageEditModal/ImageEditModal.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { ImageConstraints } from '@/base/models/imageConstraints'

export default {
  title: 'molecules/input/ImageEditModal',
  component: ImageEditModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageEditModal },
  template: '<ImageEditModal v-bind="$props" />'
})

export const Default = Template.bind({})
Default.args = {
  value: true,
  imageValue: new PortalImage(-1, undefined, undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
  imageConstraints: new ImageConstraints()
}
