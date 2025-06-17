import { action } from 'storybook/actions'
import { Meta, StoryObj } from '@storybook/vue3-vite'
import InformationButton from './InformationButton.vue'

export default {
  component: InformationButton,
  title: 'Navigation Components/InformationButton',
  render: (args: unknown) => ({
    components: { InformationButton },
    setup() {
      const click = action('click')
      return { args, click }
    },
    template: `
      <InformationButton v-bind="args" @click="click">
        An Informative Text or other html.
      </InformationButton>
    `
  })
} as Meta<typeof InformationButton>
type Story = StoryObj<typeof InformationButton>


export const Default: Story = {
  args: {
    title: 'Information about Topic'
  }
}