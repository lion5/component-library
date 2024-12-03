<template>
  <ImageDropArea
    class="file-drop-area"
    :disable="disabledFileDrop"
    :multiselect="true"
    @input="addImage"
  >
    <div class="input-gallery">
      <ImageEditCardDraggable
        v-for="(_, index) in images"
        :key="index"
        v-model:image="images[index]"
        :image-constraints="imageConstraints"
        @drag="onDrag(index)"
        @drop="onDrop(index)"
      />
      <ImageAddCard
        :accepted-mime-types="imageConstraints.mimeTypes"
        :multiselect="true"
        @input="addImage"
      />
    </div>
  </ImageDropArea>
</template>
<script lang="ts" setup>
import { GalleryForm } from '@core/models/image/galleryForm'
import { computed, ref } from 'vue'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import ImageEditCardDraggable from '@core/components/inputs/image/ImageEditCardDraggable/ImageEditCardDraggable.vue'
import ImageAddCard from '@core/components/inputs/image/ImageAddCard/ImageAddCard.vue'

/**
 * The gallery that shall be edited
 * @model
 */
const gallery = defineModel<GalleryForm>('gallery', {
  required: true
})

defineProps<{
  /**
   * The constraints for all images in the gallery
   */
  imageConstraints: ImageConstraints
}>()

const disabledFileDrop = ref(false)
const draggedIndex = ref(-1)

const images = computed({
  get: () => gallery.value.images,
  set: (newImages: GalleryForm['images']) => {
    gallery.value = new GalleryForm(newImages)
  }
})

const setActiveFileDrop = (active: boolean) => {
  disabledFileDrop.value = active
}

const addImage = (newImage: GalleryForm['images'][0]) => {
  const newGallery = gallery.value.clone()
  newGallery.addImage(newImage)
  gallery.value = newGallery
}

const onDrag = (index: number) => {
  draggedIndex.value = index
  setActiveFileDrop(true)
}

const onDrop = (droppedIndex: number) => {
  setActiveFileDrop(false)
  gallery.value.moveImage(draggedIndex.value, droppedIndex)
  gallery.value = gallery.value.clone()
}
</script>
<style lang="scss" scoped>
.input-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
}
</style>
