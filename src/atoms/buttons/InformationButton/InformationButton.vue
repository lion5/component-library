<template>
  <IconButton
      class="information-button"
      @click="showModal = true"
  >
    <IconInfoCircle />
  </IconButton>
  <DismissibleModal
      v-model:modal-displayed="showModal"
      class="information-modal"
  >
    <h2>{{ title }}</h2>
    <slot />
  </DismissibleModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconInfoCircle from '@/components/icons/IconInfoCircle.vue'
import DismissibleModal from '@/components/modals/DismissibleModal/DismissibleModal.vue'
import IconButton from '@/components/IconButton/IconButton.vue'

defineProps<{ title: string }>()

const showModal = ref<boolean>(false)
</script>
<style lang="scss" scoped>
.information-button {
  color: var(--color-primary);
  font-size: var(--font-size-4);
  cursor: pointer;

  &:hover,
  &:active,
  &:focus-visible {
    color: var(--color-primary-hover);
  }
}

.information-modal {
  :deep(.content) {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-1);
    text-align: left;
  }
}
</style>
