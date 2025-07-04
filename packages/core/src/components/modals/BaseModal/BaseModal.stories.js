import IconWallet from '@core/components/icons/IconWallet.vue'
import BaseModal from '@core/components/modals/BaseModal/BaseModal.vue'
import ActionButton from '@core/components/buttons/ActionButton/ActionButton.vue'

/**
 * BaseModal can be configured via following css custom props
 * - `--modal-width` to define the width of the modal. Default is 60ch
 */

export default {
  components: { IconWallet },
  component: BaseModal,
  title: 'Navigation Components/Modals/BaseModal'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    BaseModal,
    ActionButton,
    IconWallet
  },
  setup() {
    return { args }
  },
  template: `
    <ActionButton label="Open Modal" @click='args.modalDisplayed=true'>
      <IconWallet />
    </ActionButton>
    <BaseModal v-model:modal-displayed='args.modalDisplayed'>
      <h1>Wallet</h1>
      <p>Content here...</p>
    </BaseModal>`
})

export const Closed = Template.bind({})
Closed.args = {
  modalDisplayed: false
}

export const Open = Template.bind({})
Open.args = {
  modalDisplayed: true
}
