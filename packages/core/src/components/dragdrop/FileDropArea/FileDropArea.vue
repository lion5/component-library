<template>
  <div
    :class="{ 'file-drop-area': true, 'dragged-over': draggedOver }"
    @[dragOver].prevent="setDraggedOver(true)"
    @[drop].prevent="onDrop"
  >
    <!--    @slot insert the component around that the drop area shall be created -->
    <slot />
    <div
      v-if="draggedOver"
      class="overlay"
      @[dragLeave].prevent="setDraggedOver(false)"
    >
      <div class="background" />
      <div class="text">
        {{ dropInfo }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

/**
 * This is a wrapper component to allow users to drop files over the wrapped area.
 */
const props = withDefaults(
  defineProps<{
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     */
    disabled?: boolean
    /**
     * Changes the information text that is displayed when an item is dragged over the component.
     */
    dropInfo?: string
    /**
     * If set true it returns all dropped files.
     * If set to false it returns only the first file.
     */
    multiselect?: boolean
  }>(),
  {
    disabled: false,
    dropInfo: 'Datei hochladen',
    multiselect: false
  }
)
const emit = defineEmits<{
  /**
   * Is emitted when a file is dropped
   */
  (e: 'new-file', file: File): void
  /**
   * Is emitted when files are dropped
   */
  (e: 'new-files', files: File[]): void
}>()

const draggedOver = ref(false)
const dragOver = computed(() => (!props.disabled ? 'dragover' : null))
const dragLeave = computed(() => (!props.disabled ? 'dragleave' : null))
const drop = computed(() => (!props.disabled ? 'drop' : null))

const setDraggedOver = (newDraggedOver: boolean) => {
  draggedOver.value = newDraggedOver
}
const onDrop = async (event: DragEvent) => {
  draggedOver.value = false
  const files = event.dataTransfer?.files || []
  emit('new-files', Array.from(files))
  if (!props.multiselect && files[0] != null) {
    emit('new-file', await files[0])
    return
  }
  for (const file of files) {
    emit('new-file', file)
  }
}
</script>

<style lang="scss" scoped>
.file-drop-area {
  display: grid;
  & > * {
    grid-column: 1/2;
    grid-row: 1/2;
  }
  .overlay {
    transition: all 0.25s ease-in;
  }
}
.file-drop-area.dragged-over {
  & > :not(.overlay) {
    filter: blur(7px);
  }
  .overlay {
    display: grid;
    cursor: move;
    isolation: isolate;
    & > * {
      grid-column: 1/2;
      grid-row: 1/2;
    }
    .text {
      isolation: isolate;
      display: grid;
      place-content: center;
      font-size: 1.25rem;
      font-weight: bold;
    }
    .background {
      background-color: var(--light);
      outline: 2px dashed var(--color-primary);
      opacity: 0.4;
    }
  }
}
</style>
