import { action } from 'storybook/actions'
import InformationHeadline from '@core/components/utils/InformationHeadline/InformationHeadline.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

export default {
  component: InformationHeadline,
  title: 'Display Components/InformationHeadline',
  render: (args: unknown) => ({
    components: { InformationHeadline },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <InformationHeadline v-bind="args" @click="click">
        An Informative Text or other html.
      </InformationHeadline>
    `
  })
} as Meta<typeof InformationHeadline>
type Story = StoryObj<typeof InformationHeadline>

export const Default: Story = {
  args: {
    title: 'Topic',
    infoModalTitle: 'Information about Topic'
  }
}
