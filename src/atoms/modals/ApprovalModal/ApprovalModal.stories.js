import {ActionButton} from "@";
import IconWallet from "@/icons/IconWallet.vue";
import ApprovalModal from "@/atoms/modals/ApprovalModal/ApprovalModal.vue";
import IconTrash from "@/icons/IconTrash.vue";

export default {
  components: {IconTrash, ApprovalModal, IconWallet},
  component: ApprovalModal
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalModal,
    ActionButton,
    IconTrash
  },
  template: `
    <ApprovalModal title="Approve deletion" @accept="">
      <template #trigger="{open}">
        <ActionButton @click="open">
          <IconTrash/>
        </ActionButton>
      </template>
      <template #content>
        <p>Content here...</p>
      </template>
    </ApprovalModal>`
})

export const Default = Template.bind({})
Default.args = {}
