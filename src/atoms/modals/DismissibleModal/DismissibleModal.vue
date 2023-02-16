<template>
  <BaseModal
      v-model:modal-displayed="localModalDisplayed"
      v-slot="{openModal, closeModal}"
      class="dismissible-modal"
  >
    <div class="content">
      <slot :open-modal="openModal" :close-modal="closeModal" />
    </div>
    <CardDismissButton
        class="hide-button"
        @dismiss="closeModal"
    />
  </BaseModal>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import BaseModal from "@/atoms/modals/BaseModal/BaseModal.vue";
import CardDismissButton from "@/atoms/buttons/CardDismissButton/CardDismissButton.vue";

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
  get () {
    return props.modalDisplayed
  },
  set (newShowModal) {
    emit('update:modalDisplayed', newShowModal)
  }
})
</script>
<style lang="scss" scoped>
.dismissible-modal[open] {
  display: grid;
  grid-template-rows: min-content;

  & > * {
    grid-column: 1 / 2;
    grid-row: 1 / 2;
  }

  .hide-button:hover {
    --dismiss-button-background-color: var(--color-neutral-500);
    --dismiss-button-color: var(--color-dark);
  }
}
</style>
