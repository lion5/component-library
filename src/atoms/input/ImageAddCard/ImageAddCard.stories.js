import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'

export default {
  title: 'molecules/input/ImageAddCard',
  component: ImageAddCard
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { ImageAddCard },
  template: '<div style="display: flex;"><ImageAddCard v-bind="$props" /></div>'
})

export const Default = Template.bind({})
Default.args = {}

export const AcceptJPGOnly = Template.bind({})
AcceptJPGOnly.args = {
  acceptedMimeTypes: ['image/jpeg']
}

export const MultiFile = Template.bind({})
MultiFile.args = {
  multiselect: true
}
