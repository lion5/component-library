<template>
  <div class="image-slider">
    <button
      class="left-arrow"
      :disabled="arrivedState.left"
      @click="x -= scrollWidth"
    >
      <IconChevronLeft />
    </button>
    <div class="images" ref="scrollBox">
      <div v-for="image in images" :key="image.id">
        <input
          v-model="selectedImage"
          type="radio"
          name="image"
          :id="`image-slider-image-${image.id}`"
          :value="image"
        />
        <label :for="`image-slider-image-${image.id}`">
          <BaseImage :image="image" />
        </label>
      </div>
    </div>
    <button
      class="right-arrow"
      :disabled="arrivedState.right"
      @click="x += scrollWidth"
    >
      <IconChevronRight />
    </button>
  </div>
</template>
<script lang="ts" setup>
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'
import IconChevronLeft from '@core/components/icons/IconChevronLeft.vue'
import IconChevronRight from '@core/components/icons/IconChevronRight.vue'
import { ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'

defineProps<{
  /**
   * Array of images to be displayed in the slider
   */
  images: MinimalImage[]
}>()

/**
 * The currently selected image in the slider
 */
const selectedImage = defineModel<MinimalImage>('selectedImage')

const scrollBox = ref<HTMLElement | null>(null)
const { arrivedState, x } = useScroll(scrollBox, {
  behavior: 'smooth'
})
const scrollWidth = ref(100) // default scroll 100px
watch(scrollBox, () => {
  if (!scrollBox.value) {
    return
  }
  scrollWidth.value = scrollBox.value.scrollWidth * 0.8 // 80% of the scroll width, so that user is able to see the next image
})
watch(selectedImage, () => {
  if (!scrollBox.value) {
    return
  }
  const selectedImageElement = scrollBox.value.querySelector(
    `[for="image-slider-image-${selectedImage.value?.id}"]`
  ) as HTMLElement
  if (!selectedImageElement) {
    return
  }
  selectedImageElement.scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center'
  })
})
</script>
<style lang="scss" scoped>
.image-slider {
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--space-400);
  align-items: center;
  overflow: hidden;
  --image-width: auto;
  --image-height: 80px;

  .images {
    display: flex;
    flex-wrap: nowrap;
    gap: var(--space-300);
    overflow-x: auto;
    overscroll-behavior-inline: contain;
    padding-block-end: var(--space-500);

    & > * {
      cursor: pointer;
      flex: 0 0 auto;
      transition: transform 0.2s;

      input {
        display: none;
      }

      label {
        filter: brightness(80%);
        transition: filter 0.2s;

        &:hover {
          filter: brightness(100%);
        }
      }

      input:checked + label {
        filter: brightness(100%);

        &:after {
          content: '';
          display: block;
          width: 100%;
          height: 2px;
          background-color: var(--color-primary);
          border-radius: var(--border-radius-200);
        }
      }

      img {
        border-radius: var(--border-radius-200);
      }
    }
  }

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

    &:disabled {
      cursor: unset;
      background-color: transparent;
      color: transparent;
    }
  }
}
</style>
