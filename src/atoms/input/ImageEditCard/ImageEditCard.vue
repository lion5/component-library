<template>
  <ImageCard
    v-if="!image.removed"
    :class="{'image-edit-input-card': true, 'published': image.isPublished(), 'busy': image.busy}"
    :image="image"
    :aspect-ratio="imageConstraints.aspectRatio"
  >
    <template #overlays>
      <OverlayError
        v-if="image.hasErrors()"
        class="error-badge"
      />
      <OverlayBusy
        v-if="image.busy"
        class="loading-badge"
      />
      <CardBadgePublished
        v-if="image.isPublished()"
        class="published-badge"
      />
      <CardDismissButton
        v-if="!image.busy"
        :tabindex="0"
        class="delete-button"
        @dismiss="setRemoved"
      />
    </template>
    <template #imageModal="{displayModal, hideModal}">
      <ImageEditModal
        :value="displayModal"
        :image-value="image"
        :image-constraints="imageConstraints"
        @updateImage="setImage"
        @input="hideModal()"
      />
    </template>
  </ImageCard>
</template>
<script>

import ImageEditModal from '@/base/components/input/ImageEditModal/ImageEditModal.vue'
import OverlayError from '@/base/components/overlays/OverlayError.vue'
import OverlayBusy from '@/base/components/overlays/OverlayBusy.vue'
import CardBadgePublished from '@/base/components/card/CardBadgePublished/CardBadgePublished.vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'
import { ImageValidator } from '@/base/models/imageValidator'
import ImageCard from '@/base/components/image/ImageCard/ImageCard.vue'
import CardDismissButton from '@/base/components/card/CardDismissButton/CardDismissButton.vue'

/**
 * Card to edit and delete images. It can display error, busy and published states.
 */
export default {
  name: 'ImageEditCard',
  components: {
    CardDismissButton,
    ImageCard,
    CardBadgePublished,
    OverlayBusy,
    OverlayError,
    ImageEditModal
  },
  props: {
    /**
     * The image that shall be edited
     *
     * @model
     */
    value: {
      type: PortalImage,
      required: true
    },
    imageConstraints: {
      type: ImageConstraints,
      required: true
    }
  },
  computed: {
    image: {
      get () {
        return this.value
      },
      set (newImage) {
        this.$emit('input', newImage)
      }
    }
  },
  watch: {
    image: {
      handler (newImage) {
        if (newImage == null || newImage.isPublished()) {
          return
        }
        try {
          newImage.errors = ImageValidator.validate(newImage, this.imageConstraints)
        } catch (e) {
          // ignore validation error
        }
      },
      immediate: true
    }
  },
  methods: {
    setRemoved () {
      this.image.removed = true
    },
    setImage (newImage) {
      this.image = newImage
    }
  }
}
</script>
<style lang="scss" scoped>
@use '~@/assets/styles/_variables.scss' as variables;

.image-edit-input-card {
  border: 2px solid transparent;

  aspect-ratio: var(--image-edit-input-aspect-ratio, unset);
  display: grid;
  overflow: hidden;
  text-decoration: none;

  &:not(.busy) {
    cursor: pointer;

    &:hover, &:active, &:focus-visible, &:focus-within {
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
    padding: .25rem 1rem;
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
