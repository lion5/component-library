<template>
  <img
    class="image"
    :src="image.url"
    :alt="image.alt"
    :draggable="false"
  />
</template>
<script lang="ts" setup>
import { MinimalImage } from '@core/components/image/models/minimalImage'

/**
 * This is the base image component. It displays an image.
 */

defineProps<{
  /**
   * the image that shall be displayed
   */
  image: MinimalImage
}>()
</script>
<style lang="scss" scoped>
.image {
  aspect-ratio: var(--image-aspect-ratio, unset);
  width: var(--image-width, 100%);
  height: var(--image-height, 100%);
  object-fit: var(--image-object-fit, contain);
  object-position: var(--image-object-position, center);
}
</style>
