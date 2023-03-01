<template>
  <ImageModal
    v-model="showModal"
    :image="image"
    :aspect-ratio="imageConstraints.aspectRatio"
    :static-modal="staticModal"
  >
    <template #additionalContent>
      <PortalErrorBox
        class="error-box"
        :errors="image.errors"
      />
    </template>
  </ImageModal>
</template>
<script>

import PortalErrorBox from '@/base/components/PortalErrorBox.vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import ImageModal from '@/base/components/image/ImageModal/ImageModal.vue'

export default {
  name: 'ImageEditModal',
  components: {
    ImageModal,
    PortalErrorBox
  },
  props: {
    /**
     * Modal state. Can be used to open and close the modal (true => opened; false => closed)
     * @model
     */
    value: {
      type: Boolean,
      default: false
    },
    /**
     * Also a model used in combination with the @updateImage event.
     * Includes the image that shall be edited
     */
    imageValue: {
      type: PortalImage,
      required: true
    },
    /**
     * The constraints the image shall have.
     */
    imageConstraints: {
      type: ImageConstraints,
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
      get () {
        return this.value
      },
      set (newShowModal) {
        /**
         * triggers when modal state changes
         */
        this.$emit('input', newShowModal)
      }
    },
    image: {
      get () {
        return this.imageValue
      },
      set (newImage) {
        /**
         * triggers when image is changed
         */
        this.$emit('updateImage', newImage)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.error-box {
  margin: 0;
}
</style>
