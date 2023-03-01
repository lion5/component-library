import ImageCard from '@/base/components/image/ImageCard/ImageCard.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'

export default {
  title: 'molecules/ImageCard',
  component: ImageCard
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageCard },
  template: '<div style="display: flex;"><ImageCard v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  image: new PortalImage(undefined, undefined, undefined, undefined, new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')),
  aspectRatio: '4/3'
}
