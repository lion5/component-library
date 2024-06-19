import { Meta, StoryObj } from '@storybook/vue3'
import InfoBox from './InfoBox.vue'

/**
 * The info box should be used to display important information to the user.
 *
 * **If the infoMessage is undefined or empty, the box will not be rendered!**
 */
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

/**
 * It is also possible to use slots to display custom content inside the box.
 *
 *  **Currently, it is required to set the infoMessage prop to, but it is not displayed. Problem tracked by https://github.com/lion5/component-library/issues/201**
 */
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
