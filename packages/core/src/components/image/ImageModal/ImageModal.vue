<template>
  <DismissibleModal v-model:modal-displayed="showModal">
    <template #default>
      <div
        class="modal-content"
        :style="{ '--image-edit-input-aspect-ratio': aspectRatio }"
      >
        <div class="media-wrapper">
          <img
            class="media"
            :src="image.sizes.large || image.sizes.original"
            :alt="image.alt"
          />
        </div>
        <slot name="additionalContent" />
      </div>
    </template>
  </DismissibleModal>
</template>
<script>
import DismissibleModal from '@core/components/modals/DismissibleModal/DismissibleModal.vue'
import { PortalImage } from '@core/components/image/models/image'
/**
 * Modal to display images in full size
 */
export default {
  name: 'ImageModal',
  components: {
    DismissibleModal
  },
  props: {
    /**
     * Open and closes modal (true => open, false => close)
     * @model
     */
    modelValue: {
      type: Boolean,
      default: false
    },
    /**
     * the image that is displayed inside the modal
     */
    image: {
      type: PortalImage,
      required: true
    },
    /**
     * the aspect ratio of the image. Changes also modal's aspect ratio
     */
    aspectRatio: {
      type: String,
      required: true
    },
    /**
     * Renders the modal in a not lazy manner. The modal is inserted in the dom even if it is not displayed.
     * Should never be set to true in production. Only for testing purpose.
     *
     * For further information see https://bootstrap-vue.org/docs/components/modal#lazy-loading-and-static-modals
     */
    staticModal: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    showModal: {
      get() {
        return this.modelValue
      },
      set(newShowModal) {
        /**
         * Triggers when modal is open or closed
         *
         * @property {boolean} newShowModal the new modal state
         */
        this.$emit('update:modelValue', newShowModal)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
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
</style>
