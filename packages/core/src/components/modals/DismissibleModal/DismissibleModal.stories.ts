import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import IconWallet from '@core/components/icons/IconWallet.vue'
import ActionButton from '@core/components/buttons/ActionButton/ActionButton.vue'
import { Meta, StoryObj } from '@storybook/vue3-vite'

/**
 * DismissibleModal can be configured via following css custom props
 * - `--modal-width` to define the width of the modal. Default is 60ch
 */

export default {
  components: { IconWallet },
  component: DismissibleModal,
  title: 'Navigation Components/Modals/DismissibleModal',
  render: (args: unknown) => ({
    components: { DismissibleModal, ActionButton, IconWallet },
    setup() {
      return { args }
    },
    template: `
      <ActionButton 
        label="Open Modal" 
        @click="args.modalDisplayed=true"
      >
        <IconWallet />
      </ActionButton>
      <DismissibleModal
        v-bind="args"
        v-model:modal-displayed="args.modalDisplayed"
      >
        <h1>Wallet</h1>
        <p>Content here...</p>
      </DismissibleModal>
    `
  }),
} as Meta<typeof DismissibleModal>
type Story = StoryObj<typeof DismissibleModal>


export const Default: Story = {
  args: {
    dismissButtonLabel: 'Close',
  }
}

export const Open: Story = {
  args: {
    ...Default.args,
    modalDisplayed: true
  }
}
