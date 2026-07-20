<template>
  <dialog
    ref="modal"
    class="basic-modal"
    @cancel="closeModal"
  >
    <slot
      v-if="modalDisplayed"
      :close-modal="closeModal"
      :open-modal="openModal"
    />
  </dialog>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Open and closes modal (true => open, false => close)
     * @model
     */
    modalDisplayed?: boolean
  }>(),
  {
    modalDisplayed: false
  }
)

const emit = defineEmits<{
  (e: 'update:modalDisplayed', isDisplayed: boolean): void
}>()

const modal = ref<HTMLDialogElement>()
onMounted(() => {
  setModalVisibility(props.modalDisplayed)
})

const openModal = () => {
  emit('update:modalDisplayed', true)
}
const closeModal = () => {
  emit('update:modalDisplayed', false)
}

/**
 * Changes the visibility of the modal, depending on the given `modalDisplayed` value.
 *
 * @param modalDisplayed Whether the modal should be displayed or not.
 * @private
 */
const setModalVisibility = (modalDisplayed: boolean) => {
  if (modalDisplayed) {
    modal.value?.showModal()
  } else {
    modal.value?.close()
  }
}
watch(() => props.modalDisplayed, setModalVisibility)
</script>

<style lang="scss" scoped>
.basic-modal {
  --_modal-width: var(--modal-width, 60ch);
  border: none;
  border-radius: var(--border-radius-md) !important;
  padding: var(--modal-padding, var(--space-md));
  width: min(100%, var(--_modal-width));
  box-shadow: var(--shadow-600);

  &::backdrop {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: rgb(0, 0, 0, 0);
  }
}
</style>
