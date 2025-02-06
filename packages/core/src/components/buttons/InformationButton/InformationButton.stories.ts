import { action } from '@storybook/addon-actions'
import InformationButton from '@core/components/buttons/InformationButton/InformationButton.vue'
import { Meta, StoryObj } from '@storybook/vue3'

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