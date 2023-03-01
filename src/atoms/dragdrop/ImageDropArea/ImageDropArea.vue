<template>
  <div
    :class="{'file-drop-area': true, 'dragged-over': draggedOver}"
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

<script>
import {PortalImage} from "@/atoms/image/models/image";

/**
 * This is a wrapper component to allow users to drop images over the wrapped area.
 */
export default {
  name: 'ImageDropArea',
  props: {
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     */
    disable: {
      type: Boolean,
      default: false
    },
    /**
     * Changes the information text that is displayed when a item is dragged over the component.
     */
    dropInfo: {
      type: String,
      default: 'Bild hochladen'
    },
    /**
     * If set true it returns all dropped files.
     * If set to false it returns only the first file.
     */
    multiselect: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      draggedOver: false
    }
  },
  computed: {
    dragOver () {
      return !this.disable ? 'dragover' : null
    },
    dragLeave () {
      return !this.disable ? 'dragleave' : null
    },
    drop () {
      return !this.disable ? 'drop' : null
    }
  },
  methods: {
    setDraggedOver (draggedOver) {
      this.draggedOver = draggedOver
    },
    async onDrop (event) {
      this.draggedOver = false

      const files = event.dataTransfer.files
      if (!this.multiselect && files[0] != null) {
        /**
         * Is emitted when images are dropped
         */
        this.$emit('input', await PortalImage.fromFile(files[0]))
        return
      }
      for (const file of files) {
        this.$emit('input', await PortalImage.fromFile(file))
      }
    }
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
    transition: all .25s ease-in;
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
      opacity: .4;
    }
  }
}
</style>
