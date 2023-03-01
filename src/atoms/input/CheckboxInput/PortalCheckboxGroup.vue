<template>
  <div class="portal-checkbox-group">
    <b-form-checkbox
      :id="id"
      v-model="attribute"
      v-bind="$attrs"
    >
      {{ label }}
    </b-form-checkbox>
    <small
      v-if="infoText"
      class="info"
    >{{ infoText }}</small>
  </div>
</template>
<script>
import { BFormCheckbox } from 'bootstrap-vue'

export default {
  name: 'PortalCheckboxGroup',
  components: {
    BFormCheckbox
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    id: {
      type: String,
      required: true
    },
    label: {
      type: String,
      required: true
    },
    infoText: {
      type: String,
      default: ''
    }
  },
  computed: {
    attribute: {
      get () {
        return this.value
      },
      set (attribute) {
        this.$emit('input', attribute)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/_variables.scss" as variables;

.info, .error {
  display: block;
}

.error {
  color: var(--color-danger);
}
</style>
