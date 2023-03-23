import { action } from '@storybook/addon-actions'
import ImageDropArea from '@/atoms/dragdrop/ImageDropArea/ImageDropArea.vue'

export default {
  component: ImageDropArea
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageDropArea },
  template: `
    <ImageDropArea v-bind="$props" @input="input">
    <div
      style="background-color: var(--color-primary-surface);padding: var(--space-lg);height: 200px;display: grid; place-content: center;"
    >
      Over this area items can be dropped
    </div>
    </ImageDropArea>`,
  methods: { input: action('input') }
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
