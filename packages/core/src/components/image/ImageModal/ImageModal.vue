<template>
  <DismissibleModal
    v-model:modal-displayed="showModal"
    class="image-modal"
    dismiss-button-label="Schließen"
  >
    <template #default>
      <div
        :style="{ '--image-edit-input-aspect-ratio': aspectRatio }"
        class="modal-content"
      >
        <div class="media-wrapper">
          <img
            :alt="image.alt"
            :src="image.sizes.large || image.sizes.original"
            class="media"
          />
        </div>
        <slot name="additionalContent" />
      </div>
    </template>
  </DismissibleModal>
</template>
<script lang="ts" setup>
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import { computed } from 'vue'
import { ImageResponse } from '@core/models/image/imageResponse'

/**
 * Modal to display images in full size
 */

const props = withDefaults(
  defineProps<{
    /**
     * Open and closes modal (true => open, false => close)
     * @model
     */
    showModal?: boolean
    /**
     * the image that is displayed inside the modal
     */
    image: ImageResponse
    /**
     * the aspect ratio of the image. Changes also modal's aspect ratio
     */
    aspectRatio: string
  }>(),
  {
    showModal: false
  }
)

const emit = defineEmits<{
  /**
   * Triggers when modal is open or closed
   *
   * @property {boolean} newShowModal the new modal state
   */
  (e: 'update:showModal', newShowModal: boolean): void
}>()

const showModal = computed({
  get() {
    return props.showModal
  },
  set(newShowModal) {
    emit('update:showModal', newShowModal)
  }
})
</script>
<style lang="scss" scoped>
.image-modal {
  --modal-padding: 0;
  --modal-width: 100%;

  :deep(.hide-button) {
    position: absolute;
    right: 0;
    top: 0;
    margin: 0.25rem;
  }

  .modal-content {
    display: grid;
    grid-template-rows: 1fr min-content;

    .error-box {
      margin: 0;
    }

    .hide-button:hover {
      --dismiss-button-background-color: var(--color-light);
      --dismiss-button-color: var(--color-dark);
      filter: brightness(70%);
    }

    .media-wrapper {
      display: grid;
      aspect-ratio: var(--image-edit-input-aspect-ratio, unset);

      & > * {
        grid-column: 1 / 2;
        grid-row: 1 / 2;
      }

      .media {
        width: 100%;
        height: 100%;
        object-fit: contain;
        object-position: center;
      }
    }
  }
}
</style>
