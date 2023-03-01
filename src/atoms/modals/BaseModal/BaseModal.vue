<template>
  <dialog ref="modal" class="basic-modal" @cancel="closeModal">
    <slot :open-modal="openModal" :close-modal="closeModal"/>
  </dialog>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = withDefaults(
    defineProps<{
      modalDisplayed: boolean
    }>(),
    {
      modalDisplayed: false
    }
)

const emit = defineEmits<{
  (e: 'update:modalDisplayed', isDisplayed: boolean): void
}>()

const modal = ref<HTMLDialogElement>()
const openModal = () => {
  console.log('openModal')
  modal.value?.showModal()
  emit('update:modalDisplayed', true)
}
const closeModal = () => {
  console.log('closeModal')
  modal.value?.close()
  emit('update:modalDisplayed', false)
}

watch(() => props.modalDisplayed, (newShowModal) => {
  console.log('watch', newShowModal)
  if (newShowModal) {
    openModal()
  } else {
    closeModal()
  }
})
</script>

<style lang="scss" scoped>
.basic-modal {
  border: none;
  overflow: hidden;
  border-radius: var(--border-radius-md) !important;
  padding: 0;
  box-shadow: var(--shadow-600);

  &::backdrop {
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    background-color: rgb(0, 0, 0, 0);
  }
}
</style>
