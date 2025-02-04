<template>
  <ImageDropArea
    class="file-drop-area"
    :disable="disabledFileDrop"
    :multiselect="true"
    @input="addImage"
  >
    <div class="input-gallery">
      <ImageEditCard
        v-for="(_, index) in images"
        :key="index"
        v-model:image="images[index]"
        :image-constraints="imageConstraints"
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
import { computed, ref } from 'vue'
import { GalleryForm } from '@core/models/image/galleryForm'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import ImageDropArea from '@core/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import ImageAddCard from '@core/components/inputs/image/ImageAddCard/ImageAddCard.vue'
import ImageEditCard from '@core/components/inputs/image/ImageEditCard/ImageEditCard.vue'

defineProps<{
  /**
   * The constraints for all images in the gallery
   */
  imageConstraints: ImageConstraints
}>()

/**
 * The gallery that shall be edited
 * @model
 */
const gallery = defineModel<GalleryForm>('gallery', {
  required: true
})

const disabledFileDrop = ref(false)

const images = computed({
  get: () => gallery.value.images,
  set: (newImages: GalleryForm['images']) => {
    gallery.value = new GalleryForm(newImages)
  }
})

const addImage = (newImage: GalleryForm['images'][0]) => {
  const newGallery = gallery.value.clone()
  newGallery.addImage(newImage)
  gallery.value = newGallery
}
</script>
<style lang="scss" scoped>
.input-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
}
</style>
