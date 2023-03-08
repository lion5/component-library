<template>
  <!--
    @slot place to define a trigger that opens the modal. Can be a button, icon, link, ...
      @binding {function} openModal triggers open
  -->
  <slot :open-modal="openModal" name="trigger" />
  <DismissibleModal
    v-model:modal-displayed="localModalDisplayed"
    class="approval-modal"
  >
    <h2>{{ title }}</h2>
    <!-- @slot place for why and/or what will be approved -->
    <slot name="content" />
    <BaseButton class="approve-button" @click="approve">
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

const openModal = () => {
  localModalDisplayed.value = true
}

const approve = () => {
  emit('accept')
  emit('approve')
  localModalDisplayed.value = false
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
