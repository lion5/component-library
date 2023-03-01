<template>
  <div class="portal-image-input">
    <div class="preview">
      <img
        v-if="!!preview"
        :src="preview"
        :alt="imageFile && imageFile.name"
      >
      <img
        v-else
        :src="getPlaceholderImage(2, 1)"
        alt="placeholder"
      >
      <div
        v-if="!preview"
        :class="[globalError ? 'error' : '','preview-placeholder']"
      >
        <div class="message">
          <span>Vorschau</span>
          <small v-if="!globalError">Kein Bild ausgewählt</small>
          <small
            v-else
            class="error"
          >{{ globalError.message }}</small>
        </div>
      </div>
    </div>
    <portal-file-input-group
      v-if="!dirty"
      :id="id"
      v-model="imageFile"
      v-bind="$attrs"
      :label="label"
      :error="globalError"
      :accept="accept"
    />
    <b-button
      v-else
      variant="outline-primary"
      class="dirty-info-button"
      @click="resetImage"
    >
      Neues Bild auswählen
    </b-button>
  </div>
</template>
<script>
import PortalFileInputGroup from '@/base/components/input/PortalFileInputGroup.vue'
import { TemplateValidationError } from '@/template/exceptions'
import { imageMixin } from '@/base/mixins/imageMixin'
import { BButton } from 'bootstrap-vue'

export default {
  name: 'PortalImageInputGroup',
  components: {
    PortalFileInputGroup,
    BButton
  },
  mixins: [imageMixin],
  props: {
    value: {
      type: File,
      default: null
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    acceptedMimeTypes: {
      type: Array,
      default: null
    },
    acceptedWidth: {
      type: Number,
      default: null
    },
    acceptedHeight: {
      type: Number,
      default: null
    },
    acceptedSizeInBytes: {
      type: Number,
      default: null
    },
    error: {
      type: String,
      default: ''
    },
    previewUrl: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      preview: null,
      validationError: null,
      dirty: false
    }
  },
  computed: {
    imageFile: {
      get () {
        return this.value
      },
      set (imageFile) {
        this.$emit('input', imageFile)
      }
    },
    globalError () {
      return this.error || this.validationError
    },
    accept () {
      return this.acceptedMimeTypes.join(', ')
    }
  },
  watch: {
    value (newImage, oldImage) {
      if (newImage !== oldImage) {
        this.setImage(newImage)
      }
    },
    previewUrl (newUrl) {
      if (newUrl !== this.preview) {
        // the previewUrl changes after saving a new logo, so we have to change the preview after
        this.preview = newUrl
      }
    }
  },
  created () {
    if (this.value) {
      this.setImage(this.value)
      this.dirty = true
    }
    if (this.previewUrl && !this.preview) {
      // existing logo url from parent
      this.preview = this.previewUrl
    }
  },
  methods: {
    getPlaceholderImage (width, height) {
      return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
    },
    async setImage (file) {
      this.validationError = null
      if (file) {
        try {
          const dataUrl = await this.getDataUrlFromFile(file)
          const image = await this.getImage(dataUrl)
          this.validateImage(file, image)
          this.preview = dataUrl
        } catch (e) {
          this.validationError = e
          this.preview = null
        }
      } else {
        this.preview = null
      }
    },
    validateImage (file, image) {
      // TODO use VeeValidate ValidationProvider
      if (this.acceptedMimeTypes && !this.acceptedMimeTypes.includes(file.type)) {
        throw new TemplateValidationError(`Die Datei beinhaltet einen falschen Dateityp (${file.type}). Zugelassen sind nur die folgenden Dateitypen ${this.acceptedMimeTypes.join(', ')}.`)
      }
      if (this.acceptedWidth && image.width !== this.acceptedWidth) {
        throw new TemplateValidationError(`Die Breite des eingegebenen Bildes misst ${image.width} px. Die akzeptierte Breite sind ${this.acceptedWidth} px.`)
      }
      if (this.acceptedHeight && image.height !== this.acceptedHeight) {
        throw new TemplateValidationError(`Die Höhe des eingegebenen Bildes misst ${image.height} px. Die akzeptierte Höhe sind ${this.acceptedHeight} px.`)
      }
      if (this.acceptedSizeInBytes && file.size > this.acceptedSizeInBytes) {
        throw new TemplateValidationError(`Die maximale Dateigröße beträgt ${this.toMegaBytes(this.acceptedSizeInBytes)} MB. Die Dateigröße des Bildes beträgt ${this.toMegaBytes(file.size)} MB.`)
      }
    },
    getImage (dataUrl) {
      return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = dataUrl
        img.onload = function () {
          resolve(this)
        }
        img.onerror = err => reject(err)
      })
    },
    resetImage () {
      this.imageFile = null
      this.validationError = null
      this.dirty = false
    }
  }
}
</script>
<style lang="scss">
@use "@/assets/styles/_variables.scss" as variables;

.portal-image-input {
  .preview {
    margin-bottom: 1rem;
    position: relative;
    border-radius: 2rem;
    text-align: center;

    img {
      max-width: 100%;
      height: auto;
      max-height: 350px;
    }

    .preview-placeholder {
      position: absolute;
      top: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: var(--color-primary);

      &.error {
        background-color: var(--color-warning);
      }

      .message {
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        font-size: 2rem;
        font-weight: bolder;

        small {
          font-size: 1rem;
        }
      }
    }
  }

  .dirty-info-button {
    width: 100%;
  }
}
</style>
