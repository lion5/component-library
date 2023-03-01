<template>
  <div class="portal-file-input-group">
    <b-form-file
      :id="id"
      v-model="file"
      v-bind="$attrs"
      class="portal-file-input"
      :placeholder="label"
      :browse-text="postfix"
      :data-cy="dataCy"
    />
    <small
      v-if="error"
      class="error"
    >{{ error.message }}</small>
    <small
      v-if="infoText"
      class="info"
    >{{ infoText }}</small>
  </div>
</template>
<script>
import { BFormFile } from 'bootstrap-vue'

export default {
  name: 'PortalFileInputGroup',
  components: {
    BFormFile
  },
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
    error: {
      type: Error,
      default: ''
    },
    infoText: {
      type: String,
      default: ''
    },
    postfix: {
      type: String,
      default: ''
    },
    dataCy: {
      type: String,
      default: ''
    }
  },
  computed: {
    file: {
      get () {
        return this.value
      },
      set (file) {
        this.$emit('input', file)
      }
    }
  }
}
</script>
<style lang="scss">
@use "@/assets/styles/_variables.scss" as variables;

.portal-file-input-group {
  .portal-file-input {
    input, label {
      cursor: pointer;
    }

    label {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      padding: 0;
      margin-bottom: 0;

      .form-file-text {
        padding: var(--input-floating-label-padding-y) var(--input-floating-label-padding-x);
      }
    }

    input.required ~ label::after {
      color: unset;
      font-size: unset;
      padding-left: 0.75rem;
    }

    input.required:invalid ~ label .form-file-text::after {
      content: '*';
      font-size: 1.2rem;
      padding-left: .3rem;
      color: var(--color-danger);
    }

    input.failed ~ label {
      border-color: var(--color-danger);
    }
  }

  .error {
    color: var(--color-danger);
  }
}
</style>
