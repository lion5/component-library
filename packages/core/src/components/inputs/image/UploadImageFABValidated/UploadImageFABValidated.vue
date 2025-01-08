<template>
  <ImageInputWrapperValidated
    class="upload-image-fab"
    :name="name"
    :model-value="image"
    @update:model-value="updateImage"
  >
    <template #label>
      <IconCamera />
    </template>
  </ImageInputWrapperValidated>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import IconCamera from '@core/components/icons/IconCamera.vue'
import ImageInputWrapperValidated from '@core/components/inputs/image/ImageInputWrapperValidated/ImageInputWrapperValidated.vue'

defineProps<{ name: string }>()

const emit = defineEmits<{
  (e: 'upload', image: File): void
}>()

const image = ref<File>()

const updateImage = (newImage: File | undefined) => {
  if (!newImage) {
    return
  }
  image.value = newImage
  emit('upload', newImage)
}
</script>
<style scoped lang="scss">
.upload-image-fab {
  --_size: var(--fab-size, var(--font-size-3));
  display: grid;
  place-content: center;
  padding: var(--space-md);
  font-size: var(--font-size-4);
  background-color: var(--color-primary);
  color: var(--color-font-inverted);
  border-radius: 50%;
  line-height: 1;
  cursor: pointer;
  width: var(--_size);
  height: var(--_size);
}
</style>
