import DismissibleModal from "@/atoms/modals/DismissibleModal/DismissibleModal.vue";
import {ActionButton} from "@";
import IconWallet from "@/icons/IconWallet.vue";

export default {
  components: {IconWallet},
  component: DismissibleModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    DismissibleModal,
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
    <DismissibleModal v-model:modal-displayed="modalOpen">
    <h1>Wallet</h1>
    <p>Content here...</p>
    </DismissibleModal>`
})

export const Default = Template.bind({})
Default.args = {}
