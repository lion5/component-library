<template>
  <ImageDropArea
    class="file-drop-area"
    :disable="disabledFileDrop"
    :multiselect="true"
    @input="addImage"
  >
    <div class="input-gallery">
      <ImageEditCard
        v-for="(_, index) in images"
        :key="index"
        v-model="images[index]"
        :image-constraints="imageConstraints"
      />
      <ImageAddCard
        :accepted-mime-types="imageConstraints.mimeTypes"
        :multiselect="true"
        @input="addImage"
      />
    </div>
  </ImageDropArea>
</template>
<script>
import ImageDropArea from '@/base/components/dragdrop/ImageDropArea/ImageDropArea.vue'
import { arrayMixin } from '@/base/mixins/arrayMixin'
import ImageAddCard from '@/base/components/input/ImageAddCard/ImageAddCard.vue'
import { ImageConstraints } from '@/base/models/imageConstraints'
import { Gallery } from '@/base/models/gallery'
import ImageEditCard from '@/base/components/input/ImageEditCard/ImageEditCard.vue'

/**
 * Gallery component to add, edit, sort and remove the gallery.
 * It supports drop files to add images and sorting with drag and drop.
 */
export default {
  name: 'ImageGalleryInput',
  components: {
    ImageEditCard,
    ImageAddCard,
    ImageDropArea
  },
  mixins: [arrayMixin],
  props: {
    /**
     * The gallery that shall be edited
     * @model
     */
    value: {
      type: Gallery,
      required: true
    },
    /**
     * The constraints for all images in the gallery
     */
    imageConstraints: {
      type: ImageConstraints,
      required: true
    }
  },
  data () {
    return {
      disabledFileDrop: false,
      draggedIndex: -1
    }
  },
  computed: {
    gallery: {
      get () {
        return this.value
      },
      set (gallery) {
        /**
         * Triggers when the gallery is changed
         */
        this.$emit('input', gallery)
      }
    },
    images: {
      get () {
        return this.gallery.images
      },
      set (newImages) {
        this.gallery = new Gallery(newImages)
      }
    }
  },
  methods: {
    setActiveFileDrop (active) {
      this.disabledFileDrop = active
    },
    addImage (newImage) {
      // Better alternative?
      this.gallery.addImage(newImage)
      this.gallery = this.gallery.clone()
    }
  }
}
</script>
<style lang="scss" scoped>
.input-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-md);
}
</style>
