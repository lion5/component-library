import ImageModal from '@core/atoms/image/ImageModal/ImageModal.vue'
import { PortalImage } from '@core/atoms/image/models/image'
import { ImageSizes } from '@core/atoms/image/models/imageSizes'
import { ref } from 'vue'

export default {
  component: ImageModal
}

const Template = (args) => ({
  components: { ImageModal },
  setup() {
    const displayed = ref(true)
    return { args, displayed }
  },
  template: '<ImageModal v-bind="args" v-model="displayed" />'
})

export const Default = Template.bind({})
Default.args = {
  value: true,
  image: new PortalImage(
    undefined,
    undefined,
    undefined,
    undefined,
    new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
  ),
  aspectRatio: '4/3'
}
