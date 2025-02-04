import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import { action } from '@storybook/addon-actions'
import { Meta, StoryObj } from '@storybook/vue3'

export default {
  component: ImageDropArea,
  title: 'Input Components/ImageDropArea',
  render: (args: unknown) => ({
    components: { ImageDropArea },
    setup() {
      const input = action('new-image')
      return { args, input }
    },
    template: `
      <ImageDropArea v-bind="args" @new-image="input">
        <div
          style="background-color: var(--color-primary-surface);padding: var(--space-lg);height: 200px;display: grid; place-content: center;"
        >
          Over this area items can be dropped
        </div>
      </ImageDropArea>`
  })
} as Meta<typeof ImageDropArea>
type Story = StoryObj<typeof ImageDropArea>

export const Default: Story = {}

export const CustomDropInfo: Story = {
  args: {
    dropInfo: 'Hier können Sie Ihre Bilder hochladen.'
  }
}

export const Disabled: Story = {
  args: {
    disabled: true
  }
}

export const MultiFile: Story = {
  args: {
    multiselect: true
  }
}
