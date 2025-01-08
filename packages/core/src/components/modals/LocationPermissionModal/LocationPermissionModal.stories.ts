import { Meta, StoryObj } from '@storybook/vue3'
import LocationPermissionModal from './LocationPermissionModal.vue'
import { ref } from 'vue'
import { BaseButton } from '../../index'

export default {
  component: LocationPermissionModal,
  title: 'Navigation Components/Modals/LocationPermissionModal',
} as Meta<typeof LocationPermissionModal>
type Story = StoryObj<typeof LocationPermissionModal>

export const Default: Story = {
  render: (args: unknown) => ({
    components: { LocationPermissionModal, BaseButton },
    setup() {
      const visible = ref<boolean>()
      const showModal = () => {
        visible.value = true
      }
      return { args, showModal, visible }
    },
    template: `
      <BaseButton @click='showModal'>Show/Hide</BaseButton>
      <LocationPermissionModal v-bind='args' v-model:visible='visible' @update:visible="(value) => visible=value"/>`
  })
}

export const PermissionDenied: Story = {
  render: (args: unknown) => ({
    components: { LocationPermissionModal, BaseButton },
    setup() {
      const visible = ref<boolean>()
      const showModal = () => {
        visible.value = true
      }
      return { args, showModal, visible }
    },
    template: `
      <BaseButton @click='showModal'>Show/Hide</BaseButton>
      <LocationPermissionModal v-bind='args' v-model:visible='visible' :location-denied='true' @update:visible="(value) => visible=value" />`
  })
}
