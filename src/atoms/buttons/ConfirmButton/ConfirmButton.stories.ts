import ConfirmButton from '@/atoms/buttons/ConfirmButton/ConfirmButton.vue'
import { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'

export default {
  component: ConfirmButton
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
      v-bind="$props"
      @accept="onConfirm"
    />`
  }),
  args: {
    modalTitle: 'Please Confirm the Deletion',
    triggerButtonLabel: 'Confirm Button Label',
    variant: 'danger'
  }
}
