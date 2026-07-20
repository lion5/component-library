import { Meta, StoryObj } from '@storybook/vue3-vite'
import ImageEditModal from './ImageEditModal.vue'
import { ImageForm } from '../../../../models/image/imageForm'
import { ImageConstraints } from '../../../../models/image/imageConstraints'
import { ImageSizes } from '@core/models/image/imageSizes'

export default {
  component: ImageEditModal,
  title: 'Input Components/ImageEditModal'
} as Meta<typeof ImageEditModal>
type Story = StoryObj<typeof ImageEditModal>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { ImageEditModal },
    setup() {
      return { args }
    },
    template: '<ImageEditModal v-bind="args" />'
  }),
  args: {
    showModal: true,
    image: new ImageForm(
      -1,
      undefined,
      undefined,
      undefined,
      new ImageSizes('https://dummyimage.com/400x300/d4d4d4/fff.png')
    ),
    imageConstraints: new ImageConstraints()
  }
}
