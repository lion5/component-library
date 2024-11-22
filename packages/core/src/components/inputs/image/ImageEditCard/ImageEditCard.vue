<template>
  <ImageCard
    v-if="!image.removed"
    :class="{
      'image-edit-input-card': true,
      published: image.isPublished(),
      busy: image.busy
    }"
    :image="image"
    :aspect-ratio="imageConstraints.aspectRatio || '16/9'"
  >
    <template #overlays>
      <OverlayError v-if="image.hasErrors()" class="error-badge" />
      <OverlayBusy v-if="image.busy" class="loading-badge" />
      <CardBadgeSuccess v-if="image.isPublished()" class="published-badge" />
      <CardDismissButton
        v-if="!image.busy"
        :tabindex="0"
        class="delete-button"
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
import { watch } from 'vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { ImageValidator } from '@core/models/image/imageValidator'
import { ImageCard } from '@core/components'
import OverlayError from '@core/components/overlays/OverlayError.vue'
import OverlayBusy from '@core/components/overlays/OverlayBusy.vue'
import CardDismissButton from '@core/components/buttons/CardDismissButton/CardDismissButton.vue'
import CardBadgeSuccess from '@core/components/cards/CardBadgeSuccess/CardBadgeSuccess.vue'
import ImageEditModal from '@core/components/inputs/image/ImageEditModal/ImageEditModal.vue'

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
    } catch (e) {
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
  border: 2px solid transparent;

  aspect-ratio: var(--image-edit-input-aspect-ratio, unset);
  display: grid;
  overflow: hidden;
  text-decoration: none;

  &:not(.busy) {
    cursor: pointer;

    &:hover,
    &:active,
    &:focus-visible,
    &:focus-within {
      border: 2px solid var(--color-primary);
    }
  }

  .media {
    display: grid;
    width: 100%;
    height: 100%;
    text-decoration: none;

    & > * {
      grid-column: 1/2;
      grid-row: 1/2;
    }

    & > img {
      aspect-ratio: var(--image-edit-input-aspect-ratio, unset);
      width: 100%;
      height: 100%;
      object-fit: contain;
      object-position: center;
    }
  }

  .media,
  .loading-badge,
  .published-badge,
  .error-badge,
  .delete-button {
    grid-column: 1/2;
    grid-row: 1/2;
  }

  .delete-button {
    justify-self: end;
    align-self: start;
    z-index: 100;
  }

  .published-badge {
    justify-self: end;
    align-self: end;

    display: flex;
    gap: var(--space-sm);
    align-items: center;
    padding: 0.25rem 1rem;
    border-start-start-radius: var(--border-radius-md);
  }

  .published-badge {
    color: var(--color-success);
    background-color: var(--color-surface-1);
  }
}

.image-edit-input-card.published {
  border: 2px solid var(--color-success);
}
</style>
