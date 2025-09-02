import { Meta, StoryObj } from '@storybook/vue3-vite'
import SuccessBox from './SuccessBox.vue'

/**
 * The success box should be used to display info to successful actions.
 *
 * **If the successMessage is undefined or empty, the box will not be rendered!**
 */
const meta: Meta<typeof SuccessBox> = {
  component: SuccessBox,
  title: 'Display Components/Boxes/SuccessBox'
}
export default meta
type Story = StoryObj<typeof SuccessBox>

/**
 * It displays the success message inside the box.
 */
export const Default: Story = {
  render: (args) => ({
    components: { SuccessBox },
    setup() {
      return { args }
    },
    template: '<SuccessBox v-bind="args" />'
  }),
  args: {
    successMessage: 'This is a success message'
  }
}

/**
 * It is also possible to use slots to display custom content inside the box.
 *
 *  **Currently, it is required to set the infoMessage prop to, but it is not displayed. Problem tracked by https://github.com/lion5/component-library/issues/201**
 */
export const UseSlot: Story = {
  render: (args) => ({
    components: { SuccessBox },
    setup() {
      return { args }
    },
    template: '<SuccessBox v-bind="args"><h1>Html Content</h1><p>Success Text</p></SuccessBox>'
  }),
  args: {
    successMessage: 'Not displayed'
  }
}
