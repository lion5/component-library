<template>
  <div class="gallery">
    <ImageCard
      v-for="image in gallery.images"
      :key="image.id"
      :image="image"
      :aspect-ratio="aspectRatio"
    />
  </div>
</template>
<script lang="ts" setup>
import ImageCard from "@/atoms/image/ImageCard/ImageCard.vue";
import {Gallery} from "@/atoms/image/models/gallery";

/**
 * This displays a gallery using the {@link ImageCard} component for each image.
 */

defineProps<{
  /**
   * the gallery that includes the images to display
   */
  gallery: Gallery,
  /**
   * the aspect ratio is applied to all image cards
   */
  aspectRatio: string
}>()
</script>
<style lang="scss" scoped>
.gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
}
</style>
