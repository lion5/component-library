<template>
  <div
    :class="{'draggable-item': true, 'dragged': dragged, 'dragged-over': draggedOver}"
    draggable="true"
    @dragstart="onDragStart"
    @dragend="dragged = false"
    @dragover.prevent="draggedOver = true"
    @dragleave="draggedOver = false"
    @drop.prevent="onDrop"
  >
    <!--    @slot insert the component that shall be used -->
    <slot />
  </div>
</template>

<script lang="ts" setup>
/**
 * This is a wrapper to allow items to be dragged and dropped.
 * It displays the component differently when it is dragged and when another component is dragged over it.
 */
import { ref } from "vue";

const dragged = ref<boolean>(false)
const draggedOver = ref<boolean>(false)

defineExpose({dragged, draggedOver})

const emit = defineEmits<{
  /**
   * Is emitted when the item is dragged
   */
  (e: 'drag'): void,
  /**
   * Is emitted when the item is dropped
   */
  (e: 'drop'): void
}>()

const onDrop = () => {
  emit('drop')
  draggedOver.value = false
}
const onDragStart = () => {
  emit('drag')
  dragged.value = true
}
</script>

<style scoped>
.draggable-item {
  cursor: move;
}

.draggable-item.dragged {
  opacity: .4;
}

.draggable-item.dragged-over {
  opacity: .4;
  outline: dotted;
}
</style>
