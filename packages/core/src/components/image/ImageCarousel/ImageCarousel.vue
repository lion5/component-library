<template>
  <div class="image-carousel" ref="carouselWrapper">
    <button class="left-arrow" @click="toPreviousImage">
      <IconChevronLeft />
    </button>
    <BaseImage :image="image" @click="emit('click')" />
    <button class="right-arrow" @click="toNextImage">
      <IconChevronRight />
    </button>
  </div>
</template>
<script lang="ts" setup>
import { MinimalImage } from '@core/components/image/models/minimalImage'
import { IconChevronLeft } from '@core/components'
import IconChevronRight from '@core/components/icons/IconChevronRight.vue'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'
import { ref, watch } from 'vue'
import { onKeyStroke, useSwipe } from '@vueuse/core'

const props = withDefaults(
  defineProps<{
    /**
     * images that shall be displayed
     */
    images: MinimalImage[]
    /**
     * If true, key strokes are ignored
     */
    ignoreKeyStrokes?: boolean
  }>(),
  { ignoreKeyStrokes: false }
)

const emit = defineEmits<{
  /**
   * Event to emit when the next image selected
   */
  (event: 'next'): void
  /**
   * Event to emit when the previous image selected
   */
  (event: 'previous'): void
  /**
   * Event to emit when the image is clicked
   */
  (event: 'click'): void
}>()

const image = ref<MinimalImage>(props.images[0])

const toNextImage = () => {
  image.value = props.images[(props.images.indexOf(image.value) + 1) % props.images.length]
  emit('next')
}
const toPreviousImage = () => {
  image.value = props.images[(props.images.indexOf(image.value) - 1 + props.images.length) % props.images.length]
  emit('previous')
}
const carouselWrapper = ref<HTMLElement>()
const { isSwiping, direction } = useSwipe(carouselWrapper)
watch(isSwiping, (newIsSwiping) => {
  if (!newIsSwiping) {
    return
  }
  if (direction.value === 'left') {
    toNextImage()
  } else if (direction.value === 'right') {
    toPreviousImage()
  }
})

onKeyStroke(
  'ArrowLeft',
  () => {
    if (props.ignoreKeyStrokes) {
      return
    }
    toPreviousImage()
  },
  { dedupe: true, target: carouselWrapper }
)
onKeyStroke(
  'ArrowRight',
  () => {
    if (props.ignoreKeyStrokes) {
      return
    }
    toNextImage()
  },
  { dedupe: true, target: carouselWrapper }
)
</script>
<style lang="scss" scoped>
.image-carousel {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--carousel-action-button-spacing, var(--space-sm));
  aspect-ratio: var(--carousel-aspect-ratio, 16 / 9);

  button {
    cursor: pointer;
    background-color: var(--color-neutral-200);
    border: none;
    border-radius: var(--border-radius-200);
    padding: 0;
    height: 100%;
    font-size: var(--font-size-400);
    transition: background-color 0.2s;

    &:hover {
      background-color: var(--color-neutral-300);
    }
  }
}
</style>
