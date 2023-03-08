<template>
  <slot :open="show" name="trigger" />
  <DismissibleModal
    v-model:modal-displayed="localModalDisplayed"
    class="approval-modal"
  >
    <h2>{{ title }}</h2>
    <slot name="content"/>
    <BaseButton
        class="approve-button"
        @click="accept"
    >
      {{ buttonLabel }}
    </BaseButton>
  </DismissibleModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import DismissibleModal from "@/atoms/modals/DismissibleModal/DismissibleModal.vue";
import BaseButton from "@/atoms/buttons/BaseButton/BaseButton.vue";

const props = withDefaults(
  defineProps<{
    /**
     * The title is displayed at the top of the modal
     */
    title: string
    /**
     * The button label of the approval button inside the modal
     */
    buttonLabel?: string
    /**
     * Open and closes modal (true => open, false => close)
     * @model
     */
    modalDisplayed?: boolean
  }>(),
  {
    modalDisplayed: false,
    buttonLabel: 'Bestätigen',
  }
)

const emit = defineEmits<{
  (e: 'accept'): void
  /**
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
  },
})

const accept = () => {
  emit('accept')
  modalDisplayed.value = false
  localModalDisplayed.value = true
}

</script>
<style lang="scss" scoped>
.approval-modal :deep(.content) {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  padding: var(--space-sm);

  .approve-button {
    align-self: center;
  }
}
</style>
