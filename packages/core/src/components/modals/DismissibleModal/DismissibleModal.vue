<template>
  <BaseModal
    v-slot="{ openModal, closeModal }"
    v-model:modal-displayed="localModalDisplayed"
    class="dismissible-modal"
  >
    <CardDismissButton
      class="hide-button"
      @dismiss="closeModal"
    />
    <slot
      :close-modal="closeModal"
      :open-modal="openModal"
    />

  </BaseModal>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import BaseModal from '@core/components/modals/BaseModal/BaseModal.vue'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'

const props = withDefaults(
  defineProps<{
    /**
     * Open and closes modal (true => open, false => close)
     * @model
     */
    modalDisplayed?: boolean
  }>(),
  { modalDisplayed: false }
)

const emit = defineEmits<{
  /**
   * True if modal should be displayed false if modal should be hidden
   *
   * @property {boolean} value the new modal state
   */
  (event: 'update:modalDisplayed', value: boolean): void
}>()

const localModalDisplayed = computed({
  get() {
    return props.modalDisplayed
  },
  set(newShowModal) {
    emit('update:modalDisplayed', newShowModal)
  }
})
</script>
<style lang="scss" scoped>
.dismissible-modal[open] {
  width: min(100%, 60ch);

  .hide-button {
    float: right;
  }

  .hide-button:hover {
    --dismiss-button-background-color: var(--color-neutral-500);
    --dismiss-button-color: var(--color-dark);
  }
}
</style>
