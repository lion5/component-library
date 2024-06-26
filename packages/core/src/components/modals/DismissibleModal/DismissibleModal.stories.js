import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import IconWallet from '@core/components/icons/IconWallet.vue'
import ActionButton from '@core/components/buttons/ActionButton/ActionButton.vue'

export default {
  components: { IconWallet },
  component: DismissibleModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    DismissibleModal,
    ActionButton,
    IconWallet
  },
  setup() {
    return { args }
  },
  template: `
    <ActionButton @click="args.modalDisplayed=true">
     <IconWallet/>
    </ActionButton>
    <DismissibleModal v-model:modal-displayed="args.modalDisplayed">
    <h1>Wallet</h1>
    <p>Content here...</p>
    </DismissibleModal>`
})

export const Default = Template.bind({})
Default.args = {}

export const Open = Template.bind({})
Open.args = {
  modalDisplayed: true
}
