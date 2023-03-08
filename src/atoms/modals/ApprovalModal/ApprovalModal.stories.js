import { ActionButton } from '@'
import IconWallet from '@/icons/IconWallet.vue'
import ApprovalModal from '@/atoms/modals/ApprovalModal/ApprovalModal.vue'
import IconTrash from '@/icons/IconTrash.vue'
import { action } from '@storybook/addon-actions'

export default {
  components: { IconTrash, ApprovalModal, IconWallet },
  component: ApprovalModal,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalModal,
    ActionButton,
    IconTrash,
  },
  setup() {
    const onApprove = action('approve')
    return { args, onApprove }
  },
  template: `
    <ApprovalModal
        v-model:modal-displayed='args.modalDisplayed'
        :title="args.title" 
        @approve="onApprove"
    >
      <template #trigger="{openModal}">
        <ActionButton @click="openModal">
          <IconTrash/>
        </ActionButton>
      </template>
      <template #content>
        <p>Content here...</p>
      </template>
    </ApprovalModal>`,
})

export const Default = Template.bind({})
Default.args = {
  title: 'Approve deletion',
  modalDisplayed: false,
}
