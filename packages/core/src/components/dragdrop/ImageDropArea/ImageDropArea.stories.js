import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import { action } from '@storybook/addon-actions'

export default {
  component: ImageDropArea
}

const Template = (args) => ({
  components: { ImageDropArea },
  setup() {
    const input = action('input')
    return { args, input }
  },
  template: `
    <ImageDropArea v-bind="args" @input="input">
      <div
        style="background-color: var(--color-primary-surface);padding: var(--space-lg);height: 200px;display: grid; place-content: center;"
      >
        Over this area items can be dropped
      </div>
    </ImageDropArea>`
})

export const Default = Template.bind({})
Default.args = {}

export const CustomDropInfo = Template.bind({})
CustomDropInfo.args = {
  dropInfo: 'Hier können Sie Ihre Bilder hochladen.'
}

export const Disabled = Template.bind({})
Disabled.args = {
  disable: true
}

export const MultiFile = Template.bind({})
MultiFile.args = {
  multiselect: true
}
