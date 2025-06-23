<template>
  <ImageCard
    v-if="!image.removed"
    :class="{
      'image-edit-input-card': true,
      published: image.isPublished(),
      busy: image.busy
    }"
    :image="minimalImage"
    :aspect-ratio="imageConstraints.aspectRatio || '16/9'"
  >
    <template #overlays>
      <OverlayError v-if="image.hasErrors()" class="error-badge" />
      <OverlayBusy v-if="image.busy" class="loading-badge" />
      <CardBadgeSuccess
        v-if="image.isPublished()"
        class="published-badge"
        tooltip-text="Dieses Bild wurde veröffentlicht."
      />
      <CardDismissButton
        v-if="!image.busy"
        :tabindex="0"
        class="delete-button"
        label="Bild entfernen"
        @dismiss="setRemoved"
      />
    </template>
    <template #imageModal="{ displayModal, hideModal }">
      <ImageEditModal
        v-model:image="image"
        :showModal="displayModal"
        :image-constraints="imageConstraints"
        @updateImage="setImage"
        @update:show-modal="hideModal()"
      />
    </template>
  </ImageCard>
</template>
<script lang="ts" setup>
import { ImageForm } from '@core/models/image/imageForm'
import { computed, watch } from 'vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { ImageValidator } from '@core/models/image/imageValidator'
import ImageCard from '@core/components/image/ImageCard/ImageCard.vue'
import OverlayError from '@core/components/overlays/OverlayError.vue'
import OverlayBusy from '@core/components/overlays/OverlayBusy.vue'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'
import CardBadgeSuccess from '@core/components/cards/CardBadgeSuccess/CardBadgeSuccess.vue'
import ImageEditModal from '@core/components/inputs/image/ImageEditModal/ImageEditModal.vue'
import { ImageResponse } from '@core/models/image/imageResponse'

const props = defineProps<{
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

const minimalImage = computed(() => new ImageResponse(
  image.value.id || -1,
  image.value.alt || '',
  image.value.sizes
))
watch(
  image,
  (newImage) => {
    if (newImage == null || newImage.isPublished()) {
      return
    }
    try {
      newImage.errors = ImageValidator.validate(
        newImage,
        props.imageConstraints
      )
    } catch {
      // ignore validation error
    }
  },
  { immediate: true }
)

const setRemoved = () => {
  image.value.removed = true
}
const setImage = (newImage: ImageForm) => {
  image.value = newImage
}
</script>
<style lang="scss" scoped>
.image-edit-input-card {
  // Busy loading animation size
  --size: 2rem;
  border: 2px solid transparent;

  &:not(.busy) {
    cursor: pointer;

    &:hover,
    &:active,
    &:focus-visible,
    &:focus-within {
      border: 2px solid var(--color-primary);
    }
  }
}

.image-edit-input-card.published {
  border: 2px solid var(--color-success);
}

.delete-button {
  z-index: 1;
}
</style>
