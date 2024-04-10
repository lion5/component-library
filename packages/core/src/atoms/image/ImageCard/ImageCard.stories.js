import ImageCard from '@core/atoms/image/ImageCard/ImageCard.vue'
import { PortalImage } from '@core/atoms/image/models/image'
import { ImageSizes } from '@core/atoms/image/models/imageSizes'

export default {
  component: ImageCard
}

const Template = (args) => ({
  components: { ImageCard },
  setup() {
    return { args }
  },
  template: '<div style="display: flex;"><ImageCard v-bind="args" /></div>'
})

export const Default = Template.bind({})
Default.args = {
  image: new PortalImage(
    undefined,
    undefined,
    undefined,
    undefined,
    new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
  ),
  aspectRatio: '4/3'
}
