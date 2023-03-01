import ImageEditCardDraggable from '@/base/components/input/ImageEditCardDraggable/ImageEditCardDraggable.vue'
import { PortalImage } from '@/base/models/image'
import { ImageSizes } from '@/base/models/imageSizes'
import { ImageConstraints } from '@/base/models/imageConstraints'
import { action } from '@storybook/addon-actions'

export default {
  title: 'molecules/input/ImageEditCardDraggable',
  component: ImageEditCardDraggable
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageEditCardDraggable },
  template: '<div style="max-width: 250px;"><ImageEditCardDraggable v-bind="$props" @drag="drag" @drop="drop" @input="input"/></div>',
  methods: {
    drag: action('drag'),
    drop: action('drop'),
    input: action('input')
  }
})

function getDummyImage (busy, published, errors = []) {
  const metadata = {
    type: 'image/jpeg'
  }
  return new PortalImage(published ? 4711 : -1, '', new File([''], 'test.jpg', metadata), new Image(1200, 900), new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png'), busy, false, errors)
}

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
