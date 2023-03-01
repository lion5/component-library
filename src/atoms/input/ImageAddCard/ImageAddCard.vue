<template>
  <PortalItemCard class="image-input-card">
    <input
      id="add-image"
      tabindex="0"
      class="image-input"
      type="file"
      :accept="accept"
      :multiple="multiselect"
      @change="addImage"
    >
    <label for="add-image">
      <b-icon-plus class="add-icon" />
    </label>
  </PortalItemCard>
</template>
<script>
import { BIconPlus } from 'bootstrap-vue'

import PortalItemCard from '@/base/components/PortalItemCard.vue'
import { PortalImage } from '@/base/models/image'

/**
 * This is a file input designed as a card. It can be used for single and multi file inputs.
 */
export default {
  name: 'ImageAddCard',
  components: {
    PortalItemCard,
    BIconPlus
  },
  props: {
    /**
     * Switches the input mode between single file upload (false) and multi file upload (true)
     */
    multiselect: {
      type: Boolean,
      default: false
    },
    /**
     * Defines the allowed file types to upload. The arrays value's need to be mime types.
     *
     * See https://www.iana.org/assignments/media-types/media-types.xhtml#image for the allowed mime types.
     */
    acceptedMimeTypes: {
      type: Array[String],
      default: () => ([])
    }
  },
  computed: {
    accept () {
      return this.acceptedMimeTypes.join(', ')
    }
  },
  methods: {
    async addImage (event) {
      const files = this.getFiles(event)

      for (const file of files) {
        const image = await PortalImage.fromFile(file)
        /**
         * Triggers when one or multiple files are submitted.
         *
         * @property {PortalImage} image new loaded image
         */
        this.$emit('input', image)
      }
    },
    getFiles (event) {
      // Is required to be able to test file input
      return event.target.files
    }
  }
}
</script>
<style lang="scss" scoped>
.image-input-card {
  display: grid;
  aspect-ratio: 4/3;

  &:hover, &:active {
    background-color: var(--color-success-surface);
  }

  &:focus-visible, &:focus-within {
    border: 2px solid var(--color-primary);
  }

  input, label {
    grid-row: 1/2;
    grid-column: 1/2;
  }

  input {
    opacity: 0;
    cursor: pointer;
  }

  label {
    display: grid;
    place-content: center;
    cursor: pointer;
    width: 100%;
    height: 100%;
    margin: 0;

    .add-icon {
      font-size: 5rem;
      color: var(--success);
    }
  }
}
</style>
