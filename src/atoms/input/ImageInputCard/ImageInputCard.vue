<template>
  <ImageDropArea
    class="card-input-image"
    @input="setImage"
  >
    <ImageAddCard
      v-if="image == null || image.removed"
      :accepted-mime-types="imageConstraints.mimeTypes"
      @input="setImage"
    />
    <ImageEditCard
      v-else
      v-model="image"
      :image-constraints="imageConstraints"
      @remove="setImage(undefined)"
    />
  </ImageDropArea>
</template>
<script>
import ImageDropArea from '@/base/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'
import { PortalImage } from '@/base/models/image'
import { ImageConstraints } from '@/base/models/imageConstraints'

/**
 * Controls single file image input.
 */
export default {
  name: 'ImageInputCard',
  components: {
    ImageEditCard,
    ImageAddCard,
    ImageDropArea
  },
  props: {
    /**
     * The image that is been added or that shall be edited
     * @model
     */
    value: {
      type: PortalImage,
      default: undefined
    },
    /**
     * The constraints the image need to fulfill
     */
    imageConstraints: {
      type: ImageConstraints,
      required: true
    }
  },
  emits: ['input'],
  computed: {
    image: {
      get () {
        return this.value
      },
      set (newImage) {
        /**
         * Triggered when the image was edited
         */
        this.$emit('input', newImage)
      }
    }
  },
  methods: {
    setImage (image) {
      this.image = image
    }
  }
}
</script>
