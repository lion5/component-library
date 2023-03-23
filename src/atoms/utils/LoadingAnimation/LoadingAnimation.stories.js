import LoadingAnimation from '@/atoms/utils/LoadingAnimation/LoadingAnimation.vue'

export default {
  component: LoadingAnimation,
  argTypes: {
    type: {
      options: ['grow', 'hueRotate']
    }
  }
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    LoadingAnimation
  },
  template: `<LoadingAnimation v-bind="$props"/>`
})

export const Default = Template.bind({})
Default.args = {}

export const WithMessage = Template.bind({})
WithMessage.args = {
  msg: 'Wait a minute while we are loading our components.'
}

export const UsingHueRotateAnimation = Template.bind({})
UsingHueRotateAnimation.args = {
  type: 'hueRotate'
}
