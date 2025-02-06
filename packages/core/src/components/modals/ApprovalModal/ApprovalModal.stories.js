import IconWallet from '@core/components/icons/IconWallet.vue'
import ApprovalModal from '@core/components/modals/ApprovalModal/ApprovalModal.vue'
import IconTrash from '@core/components/icons/IconTrash.vue'
import { action } from '@storybook/addon-actions'

export default {
  components: { IconTrash, ApprovalModal, IconWallet },
  component: ApprovalModal,
  title: 'Navigation Components/Modals/ApprovalModal'
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    ApprovalModal,
    IconTrash
  },
  setup() {
    const onApprove = action('approve')
    return { args, onApprove }
  },
  template: `
    <ApprovalModal
      v-model:modal-displayed='args.modalDisplayed'
      :title='args.title'
      @approve='onApprove'
    >
      <template #trigger='{openModal}'>
        <button @click='openModal'>
          <IconTrash />
        </button>
      </template>
      <template #content>
        <p>Content here...</p>
      </template>
    </ApprovalModal>`
})

export const Default = Template.bind({})
Default.args = {
  title: 'Approve deletion',
  modalDisplayed: false
}
