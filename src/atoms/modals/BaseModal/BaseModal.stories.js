import {ActionButton} from "@";
import IconWallet from "@/icons/IconWallet.vue";
import BaseModal from "@/atoms/modals/BaseModal/BaseModal.vue";

export default {
  components: {IconWallet},
  component: BaseModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    BaseModal,
    ActionButton,
    IconWallet
  },
  data() {
    return {
      modalOpen: false
    }
  },
  template: `
    <ActionButton @click="modalOpen=true">
     <IconWallet/>
    </ActionButton>
    <BaseModal v-model:modal-displayed="modalOpen">
    <h1>Wallet</h1>
    <p>Content here...</p>
    </BaseModal>`
})

export const Default = Template.bind({})
Default.args = {
  id: 'base-modal-1'
}
