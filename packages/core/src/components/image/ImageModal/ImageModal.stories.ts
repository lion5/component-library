import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import { ref } from 'vue'
import { Meta, StoryObj } from '@storybook/vue3'

/**
 * Modal to display images in full size
 */
export default {
  component: ImageModal
} as Meta<typeof ImageModal>
type Story = StoryObj<typeof ImageModal>

const Template = (args: unknown) => ({
  components: { ImageModal },
  setup() {
    const displayed = ref(true)
    return { args, displayed }
  },
  template: '<ImageModal v-bind="args" v-model:show-modal="displayed" />'
})

export const Default: Story = {
  render: Template,
  args: {
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
}
