<template>
  <ItemCard
    class="image-card"
    :style="{ '--image-edit-input-aspect-ratio': aspectRatio }"
  >
    <a class="media" :tabindex="0" @click="showModal">
      <img
        :src="image.sizes.mid || image.sizes.original"
        :alt="image.alt"
        :draggable="false"
      />
      <!--  @slot all entered components are stacked above the image   -->
      <slot name="overlays" />
    </a>
    <!--
    @slot overwrites the default image modal
      @binding {boolean} displayModal state of the modal (true => show; false => hide)
      @binding {function} hideModal sets the displayModal to false
    -->
    <slot
      name="imageModal"
      :display-modal="displayModal"
      :hide-modal="hideModal"
    >
      <ImageModal
        v-model:show-modal="displayModal"
        :image="image"
        :aspect-ratio="aspectRatio"
      />
    </slot>
  </ItemCard>
</template>
<script lang="ts" setup>
import ImageModal from '@core/components/image/ImageModal/ImageModal.vue'
import ItemCard from '@core/components/cards/ItemCard/ItemCard.vue'
import { PortalImage } from '@core/components/image/models/image'
import { ref } from 'vue'

/**
 * This is the base image card component. It displays a modal on click with the image in full size.
 */

const props = defineProps<{
  /**
   * the image that shall be displayed
   */
  image: PortalImage
  /**
   * the aspect ratio the displayed image has (changes the card's aspect ratio)
   */
  aspectRatio: string
}>()

const displayModal = ref(false)
const showModal = () => {
  if (props.image.busy) {
    return
  }
  displayModal.value = true
}
const hideModal = () => {
  displayModal.value = false
}
</script>
<style lang="scss" scoped>
.image-card {
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

  & > * {
    grid-column: 1/2;
    grid-row: 1/2;
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
}
</style>
