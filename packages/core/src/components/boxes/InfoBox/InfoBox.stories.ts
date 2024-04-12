import { Meta, StoryObj } from '@storybook/vue3'
import InfoBox from './InfoBox.vue'

const meta: Meta<typeof InfoBox> = {
  component: InfoBox
}
export default meta
type Story = StoryObj<typeof InfoBox>

/**
 * It displays the info message inside the box.
 */
export const Default: Story = {
  render: (args) => ({
    components: { InfoBox },
    setup() {
      return { args }
    },
    template: '<InfoBox v-bind="args" />'
  }),
  args: {
    infoMessage: 'This is an info message'
  }
}

export const UseSlot: Story = {
  render: (args) => ({
    components: { InfoBox },
    setup() {
      return { args }
    },
    template:
      '<InfoBox v-bind="args"><h1>Html Content</h1><p>Informative Text</p></InfoBox>'
  }),
  args: {
    infoMessage: 'Not displayed'
  }
}
