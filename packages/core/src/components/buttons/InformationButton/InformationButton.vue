<template>
  <IconButton
    class="information-button"
    :label="label"
    @click="showModal = true"
  >
    <IconInfoCircle />
  </IconButton>
  <DismissibleModal
    v-model:modal-displayed="showModal"
    class="information-modal"
    dismiss-button-label="Schließen"
  >
    <h2>{{ title }}</h2>
    <!-- @slot the modals content -->
    <slot />
  </DismissibleModal>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import IconInfoCircle from '@core/components/icons/IconInfoCircle.vue'
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'

/**
 Additional information that are relevant for the first use but bloat the UI for advance users can be hidden behind a information button.
 */

withDefaults(
  defineProps<{
    /**
     * the modals title
     */
    title: string
    /**
     * The label for the button, used for accessibility.
     */
    label?: string
  }>(),
  {
    label: 'Mehr Informationen'
  }
)

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
  h2 {
    margin-top: 0;
    // This need to be the size of the dismiss button
    margin-right: var(--font-size-4);
  }

  :deep(.content) {
    padding: var(--space-sm) var(--space-md);
    font-size: var(--font-size-1);
    text-align: left;
  }
}
</style>
