import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'
import { action } from 'storybook/actions'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import ImageDropArea from '../ImageDropArea/ImageDropArea.vue'

export default {
  component: FileDropArea,
  title: 'Input Components/FileDropArea',
  render: (args) => ({
    components: { FileDropArea },
    setup() {
      const input = action('new-file')
      return { args, input }
    },
    template: `
      <FileDropArea v-bind="args" @new-file="input">
        <div
          style="background-color: var(--color-primary-surface);padding: var(--space-lg);height: 200px;display: grid; place-content: center;"
        >
          Over this area items can be dropped
        </div>
      </FileDropArea>`
  })
} as Meta<typeof ImageDropArea>
type Story = StoryObj<typeof ImageDropArea>

export const Default: Story = {}

export const CustomDropInfo: Story = {
  args: {
    dropInfo: 'Hier können Sie Ihre Dateien hochladen.'
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
