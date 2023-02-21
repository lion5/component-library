<template>
  <slot :open="show" name="trigger" />
  <DismissibleModal
      v-model:modal-displayed="modalDisplayed"
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

withDefaults(
    defineProps<{
      title: string,
      buttonLabel?: string
    }>(),
    { buttonLabel: 'Bestätigen' }
)

const emit = defineEmits<{
  (e: 'accept'): void
}>()

const show = () => {
  modalDisplayed.value = true
}

defineExpose({
  /**
   * FIXME: currently this documentation is not shown in Storybook
   * Displays the modal. The modal can be hidden by the user via the built-in approval button.
   */
  show
})

const accept = () => {
  emit('accept')
  modalDisplayed.value = false
}

const modalDisplayed = ref<boolean>(false)
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
