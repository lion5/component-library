<template>
  <div class="floating-input-group">
    <multiselect
      :id="id"
      v-model="selectedObject"
      :options="options"
      :placeholder="label + ' ' + placeholderSuffix"
      :track-by="'value'"
      label="text"
      :multiple="false"
      :taggable="false"
      :close-on-select="true"
      deselect-label="Auswahl kann nicht gelöscht werden."
      :allow-empty="false"
      :show-labels="false"
      v-bind="$attrs"
      @select="emitKey"
    >
      <template
        v-for="name in $slots"
        #[name]
      >
        <slot :name="name" />
      </template>
    </multiselect>
    <label
      class="floating-label-active required-field-label"
      :for="id"
    >{{ label }}</label>
    <small
      v-if="error"
      class="error"
    >{{ error }}</small>
  </div>
</template>
<script>
import Multiselect from 'vue-multiselect'

export default {
  name: 'PortalSelectGroup',
  components: {
    Multiselect
  },
  props: {
    value: {
      type: [String, Number, Object, undefined],
      default: undefined
    },
    options: {
      type: Array,
      required: true
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
      type: String,
      default: ''
    },
    defaultOption: {
      type: Object,
      default: undefined
    },
    placeholderSuffix: {
      type: String,
      default: 'wählen'
    }
  },
  data () {
    return {
      selectedObject: null
    }
  },
  mounted () {
    if (this.value != null) {
      const optionsMap = this.options.reduce((accumulator, obj) => {
        accumulator[obj.value] = obj
        return accumulator
      }, {})
      this.selectedObject = optionsMap[this.value]
    } else {
      this.selectedObject = this.defaultOption
    }
    if (this.selectedObject != null) {
      this.emitKey(this.selectedObject)
    }
  },
  methods: {
    // eslint-disable-next-line no-unused-vars,@typescript-eslint/no-unused-vars
    emitKey (selectedOption, _) {
      this.$emit('input', selectedOption.value)
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/_variables.scss" as variables;

.error {
  color: var(--color-danger);
}

.multiselect--active ~ label {
  // label must be above active Multiselect div
  z-index: 100;
}

:deep(.multiselect) {
  .multiselect__tags {
    height: calc(2.25rem + 2px);
    color: #495057;
    background-color: #fff;
    border: 1px solid #ced4da;
    border-radius: 0;
  }

  .multiselect__placeholder {
    margin: 0;
    padding: 0;
    color: #495057;
  }

  .multiselect__tag {
    background-color: var(--color-primary);
    border-radius: 2rem;
    margin-top: .1rem;

    &-icon {
      &:after {
        color: white;
      }

      &:hover {
        background: var(--color-primary-hover);
      }
    }
  }

  .multiselect__placeholder {
    font-size: 1rem;
  }
}
</style>
