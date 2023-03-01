<template>
  <!--
   triggered when the edit card is dropped
   @event drop
  -->
  <!--
   triggered when the edit card is dragged by the user
   @event drag
  -->
  <DraggableItem
    v-if="!image.removed"
    :class="{'gallery-input-card': true}"
    @drop="$emit('drop')"
    @drag="$emit('drag')"
  >
    <ImageEditCard
      v-model="image"
      :image-constraints="imageConstraints"
    />
  </DraggableItem>
</template>
<script>

import DraggableItem from '@/base/components/dragdrop/DraggableItem/DraggableItem.vue'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'

/**
 * This combines the {@link ImageEditCard} with the {@link DraggableItem}.
 */
export default {
  name: 'ImageEditCardDraggable',
  components: {
    ImageEditCard,
    DraggableItem
  },
  props: {
    /**
     * The image that shall be edited
     *
     * @model
     */
    value: {
      type: PortalImage,
      required: true
    },
    /**
     * The constraints that an image need to fulfill
     */
    imageConstraints: {
      type: ImageConstraints,
      required: true
    }
  },
  emits: ['drag', 'drop', 'input'],
  computed: {
    image: {
      get () {
        return this.value
      },
      set (newImage) {
        /**
         * triggered when the image shall be changed
         */
        this.$emit('input', newImage)
      }
    }
  }
}
</script>
