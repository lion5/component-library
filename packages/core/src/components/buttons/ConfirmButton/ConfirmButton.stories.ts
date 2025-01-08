import { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import ConfirmButton from './ConfirmButton.vue'

export default {
  component: ConfirmButton,
  title: 'Navigation Components/ConfirmButton'
} as Meta<typeof ConfirmButton>
type Story = StoryObj<typeof ConfirmButton>

export const Default: Story = {
  render: (args) => ({
    setup() {
      const onConfirm = action('confirm')
      return { args, onConfirm }
    },
    components: { ConfirmButton },
    template: `<ConfirmButton
      v-model:modal-displayed='args.modalDisplayed'
      v-bind="args"
      @accept="onConfirm"
    />`
  }),
  args: {
    modalTitle: 'Please Confirm the Deletion',
    triggerButtonLabel: 'Confirm Button Label',
    variant: 'danger'
  }
}
