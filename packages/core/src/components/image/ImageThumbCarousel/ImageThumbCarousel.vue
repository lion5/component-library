<template>
  <div class="image-thumb-carousel">
    <ImageCarousel
      :selected-image="selectedImage"
      :images="images"
      @update:selected-image="onImageChange"
      @click="modalMode = true"
    />
    <DismissibleModal v-if="modalMode" v-model:modalDisplayed="modalMode">
      <ImageCarousel
        v-model:selected-image="selectedFullScreenImage"
        :images="fullScreenImages"
        style="--carousel-action-button-spacing: 0"
        @update:selected-image="onFullScreenImageChange"
      />
    </DismissibleModal>
    <ImageSlider
      :selected-image="selectedThumbnail"
      :images="thumbnails"
      @update:selected-image="onThumbnailImageChange"
    />
  </div>
</template>
<script lang="ts" setup>
import { MinimalImage } from '@core/components/image/models/minimalImage'
import ImageSlider from '@core/components/image/ImageSlider/ImageSlider.vue'
import { computed, ref } from 'vue'
import { MultiScaleImage } from '@core/components/image/models/multiScaleImage'
import ImageCarousel from '@core/components/image/ImageCarousel/ImageCarousel.vue'
import { DismissibleModal } from '@core/components'

const props = defineProps<{
  /**
   * images that shall be displayed
   */
  images: MultiScaleImage[]
}>()

const modalMode = ref(false)
const currentIndex = ref(0)

const thumbnails = computed(() =>
  props.images.map(
    (image) => new MinimalImage(image.id, image.alt, image.sizes.small)
  )
)
const selectedThumbnail = computed<MinimalImage>(() => thumbnails.value[currentIndex.value])
const onThumbnailImageChange = (selectedImage: MinimalImage) => {
  currentIndex.value = thumbnails.value.findIndex(
    (image) => image.id === selectedImage.id
  )
}

const fullScreenImages = computed(() =>
  props.images.map(
    (image) => new MinimalImage(image.id, image.alt, image.sizes.original)
  )
)
const selectedFullScreenImage = computed<MinimalImage>(() => fullScreenImages.value[currentIndex.value])
const onFullScreenImageChange = (selectedImage: MinimalImage) => {
  currentIndex.value = fullScreenImages.value.findIndex(
    (image) => image.id === selectedImage.id
  )
}

const images = computed(() =>
  props.images.map(
    (image) => new MinimalImage(image.id, image.alt, image.sizes.large)
  )
)
const selectedImage = computed<MinimalImage>(() => images.value[currentIndex.value])
const onImageChange = (selectedImage: MinimalImage) => {
  currentIndex.value = images.value.findIndex(
    (image) => image.id === selectedImage.id
  )
}


</script>
<style lang="scss" scoped>
.image-thumb-carousel {
  display: grid;
  gap: var(--space-md);
}
</style>
