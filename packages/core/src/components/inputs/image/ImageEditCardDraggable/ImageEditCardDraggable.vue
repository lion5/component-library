<template>
  <DraggableItem
    v-if="!image.removed"
    :class="{ 'gallery-input-card': true }"
    @drop="emit('drop')"
    @drag="emit('drag')"
  >
    <ImageEditCard
      v-model:image="image"
      :image-constraints="imageConstraints"
    />
  </DraggableItem>
</template>
<script lang="ts" setup>
import DraggableItem from '@core/components/dragdrop/DraggableItem/DraggableItem.vue'
import ImageEditCard from '@core/components/inputs/image/ImageEditCard/ImageEditCard.vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { ImageForm } from '@core/models/image/imageForm'

defineProps<{
  /**
   * The constraints that an image need to fulfill
   */
  imageConstraints: ImageConstraints
}>()

/**
 * The image that shall be edited
 *
 * @model
 */
const image = defineModel<ImageForm>('image', {
  required: true
})

const emit = defineEmits<{
  /**
   * Triggers when the edit card is dropped
   * @param event
   */
  (event: 'drag'): void
  /**
   * Triggers when the edit card is dragged by the user
   * @param event
   */
  (event: 'drop'): void
}>()
</script>
