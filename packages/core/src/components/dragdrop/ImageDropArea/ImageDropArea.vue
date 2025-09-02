<template>
  <FileDropArea
    :disabled="disable || disabled"
    :dropInfo="dropInfo"
    :multiselect="multiselect"
    @new-file="onImageDrop"
  >
    <slot />
  </FileDropArea>
</template>

<script lang="ts" setup>
import { ImageForm } from '@core/models/image/imageForm'
import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'

/**
 * This is a wrapper component to allow users to drop images over the wrapped area.
 */
withDefaults(
  defineProps<{
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     * @deprecated Use `disabled` prop instead
     */
    disable?: boolean
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     * @since 0.23.0
     */
    disabled?: boolean
    /**
     * Changes the information text that is displayed when a item is dragged over the component.
     */
    dropInfo?: string
    /**
     * If set true it returns all dropped files.
     * If set to false it returns only the first file.
     */
    multiselect?: boolean
  }>(),
  {
    disable: false,
    disabled: false,
    dropInfo: 'Bild hochladen',
    multiselect: false
  }
)
const emit = defineEmits<{
  /**
   * Is emitted when images are dropped
   * @deprecated Use `new-image` event instead
   */
  (e: 'input', image: ImageForm): void
  /**
   * Is emitted when images are dropped
   * @since 0.23.0
   */
  (e: 'new-image', image: ImageForm): void
}>()

const onImageDrop = async (file: File) => {
  const imageForm = await ImageForm.fromFile(file)
  emit('input', imageForm)
  emit('new-image', imageForm)
}
</script>

<style lang="scss" scoped></style>
