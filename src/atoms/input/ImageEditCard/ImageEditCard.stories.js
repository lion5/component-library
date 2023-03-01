import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { ImageConstraints } from '@/base/models/imageConstraints'

export default {
  title: 'molecules/input/ImageEditCard',
  component: ImageEditCard
}

function getDummyImage (busy, published, errors = []) {
  const metadata = {
    type: 'image/jpeg'
  }
  return new PortalImage(published ? 4711 : -1, '', new File([''], 'test.jpg', metadata), new Image(1200, 900), new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'), busy, false, errors)
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageEditCard },
  template: '<div style="max-width: 250px;"><ImageEditCard v-model="value" v-bind="$props" /></div>'
})

export const Local = Template.bind({})
Local.args = {
  value: getDummyImage(),
  imageConstraints: new ImageConstraints([], '4/3')
}

export const Busy = Template.bind({})
Busy.args = {
  value: getDummyImage(true),
  imageConstraints: new ImageConstraints([], '4/3')
}

export const Published = Template.bind({})
Published.args = {
  value: getDummyImage(undefined, true),
  imageConstraints: new ImageConstraints([], '4/3')
}

export const Errors = Template.bind({})
Errors.args = {
  value: getDummyImage(),
  imageConstraints: new ImageConstraints([], '4/3', 123)
}
