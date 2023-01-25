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

<script>
/**
 * This is a wrapper to allow items to be dragged and dropped.
 * It displays the component differently when it is dragged and when another component is dragged over it.
 */
export default {
  name: 'DraggableItem',
  emits: ['drag', 'drop'],
  data () {
    return {
      dragged: false,
      draggedOver: false
    }
  },
  methods: {
    onDrop () {
      /**
       * Is emitted when the item is dropped
       */
      this.$emit('drop')
      this.draggedOver = false
    },
    onDragStart () {
      /**
       * Is emitted when the item is dragged
       */
      this.$emit('drag')
      this.dragged = true
    }
  }
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
