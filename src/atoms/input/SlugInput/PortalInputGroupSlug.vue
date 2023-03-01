<template>
  <div class="slug-input-group">
    <PortalInputGroup
      :id="id"
      v-model.lazy="slug"
      :label="label"
      :error="error"
      :info-text="infoText"
      :prefix="prefix"
      :postfix="postfix"
      :data-cy="dataCy"
      v-bind="$attrs"
      @change="setDirty(true)"
    />
  </div>
</template>
<script>
import { ApiError } from '@/base/exceptions'
import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'

export default {
  name: 'PortalInputGroupSlug',
  components: {
    PortalInputGroup
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    defaultValue: {
      type: String,
      default: ''
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
      type: [String, ApiError],
      default: ''
    },
    infoText: {
      type: String,
      default: ''
    },
    prefix: {
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
  data () {
    return {
      dirty: false
    }
  },
  computed: {
    slug: {
      get () {
        if (!this.dirty) {
          return this.valueToSlug(this.defaultValue)
        }
        return this.value
      },
      set (newSlug) {
        this.dirty = true
        this.$emit('input', newSlug)
      }
    }
  },
  watch: {
    defaultValue: {
      immediate: true,
      handler: function () {
        if (!this.dirty) {
          this.$emit('input', this.slug)
        }
      }
    }
  },
  methods: {
    valueToSlug (value) {
      // Based on ideas from https://gist.github.com/codeguy/6684588
      return value.toString()
        .toLowerCase()
        .trim()
        .replace(/&/g, 'und')
        .replace(/ä/g, 'ae')
        .replace(/ö/g, 'oe')
        .replace(/ü/g, 'ue')
        .replace(/ß/g, 'ss')
        .normalize('NFD') // Canonical Decomposition. So that special characters can be removed in the next step https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/normalize
        .replace(/[^a-z0-9 -]/g, '') // remove all chars not letters, numbers and spaces
        .replace(/\s+/g, '-')
    },
    setDirty (value) {
      this.dirty = value
    }
  }
}
</script>
<style lang="scss" scoped>
.slug-input-group {
  display: flex;
  gap: 1rem;

  .portal-input-group {
    flex-grow: 1;
  }

  .reset-icon {
    transition: transform 500ms;

    &:hover {
      transform: rotate(270deg);
    }
  }
}
</style>
