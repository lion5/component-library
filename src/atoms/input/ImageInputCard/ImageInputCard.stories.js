import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageInputCard from '@/base/components/input/ImageInputCard/ImageInputCard.vue'

export default {
  title: 'molecules/input/ImageInputCard',
  component: ImageInputCard
}

function getDummyImage ({
  busy = false,
  published = false,
  errors = [],
  removed = false
}) {
  const metadata = {
    type: 'image/jpeg'
  }
  return new PortalImage(published ? 4711 : -1, '', new File([''], 'test.jpg', metadata), new Image(1200, 900), new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'), busy, removed, errors)
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageInputCard },
  template: '<div style="display: flex;"><ImageInputCard v-bind="$props" /></div>'
})

export const NoImage = Template.bind({})
NoImage.args = {
  value: undefined,
  imageConstraints: new ImageConstraints(undefined, '4/3')
}

export const RemovedImage = Template.bind({})
RemovedImage.args = {
  value: getDummyImage({ removed: true }),
  imageConstraints: new ImageConstraints(undefined, '4/3')
}

export const BusyImage = Template.bind({})
BusyImage.args = {
  value: getDummyImage({ busy: true }),
  imageConstraints: new ImageConstraints(undefined, '4/3')
}

export const PublishedImage = Template.bind({})
PublishedImage.args = {
  value: getDummyImage({ published: true }),
  imageConstraints: new ImageConstraints(undefined, '4/3')
}

export const Errors = Template.bind({})
Errors.args = {
  value: getDummyImage({}),
  imageConstraints: new ImageConstraints(undefined, '4/3', 1234)
}
