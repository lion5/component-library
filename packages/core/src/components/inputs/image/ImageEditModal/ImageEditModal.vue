<template>
  <ImageModal
    v-model:show-modal="showModal"
    :image="minimalImage"
    :aspect-ratio="imageConstraints.aspectRatio || '16:9'"
  >
    <template #additionalContent>
      <ErrorBox class="error-box" :errors="image.errors" />
    </template>
  </ImageModal>
</template>
<script lang="ts" setup>
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import { ImageForm } from '@core/models/image/imageForm'
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { computed } from 'vue'
import { ImageResponse } from '@core/models/image/imageResponse'

defineProps<{
  /**
   * The constraints the image shall have.
   */
  imageConstraints: ImageConstraints
}>()

defineEmits<{
  /**
   * triggers when image is changed
   */
  (event: 'updateImage', image: ImageForm): void
}>()

const minimalImage = computed(() => new ImageResponse(
  image.value.id || -1,
  image.value.alt || '',
  image.value.sizes
))

/**
 * Modal state. Can be used to open and close the modal (true => opened; false => closed)
 * @model
 */
const showModal = defineModel<boolean>('showModal', {
  required: true
})

/**
 * Also a model used in combination with the @updateImage event.
 * Includes the image that shall be edited
 */
const image = defineModel<ImageForm>('image', {
  required: true
})
</script>
<style lang="scss" scoped>
.error-box {
  margin: 0;
}
</style>
