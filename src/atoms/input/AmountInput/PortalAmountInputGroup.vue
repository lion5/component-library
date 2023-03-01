<template>
  <portal-input-group
    :id="id"
    v-model="attribute"
    :label="label"
    type="number"
    step="0.01"
    lang="de-DE"
    v-bind="$attrs"
    :data-cy="dataCy"
    :validation-rules="validationRules"
  />
</template>
<script>

import PortalInputGroup from '@/base/components/input/InputGroup/PortalInputGroup.vue'

export default {
  name: 'PortalAmountInputGroup',
  components: { PortalInputGroup },
  props: {
    value: {
      type: [Number],
      required: false,
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
    dataCy: {
      type: String,
      default: ''
    },
    /**
     * Validation constraints of this field, see {@link PortalValidationWrapper.validationRules}
     */
    validationRules: {
      type: [String, Object],
      default: ''
    }
  },
  computed: {
    attribute: {
      get () {
        return this.value / 100
      },
      set (attribute) {
        const value = Math.trunc(parseFloat(attribute) * 100)
        this.$emit('input', value)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
@use "@/assets/styles/_variables.scss" as variables;

.floating-input-group {
  input {
    display: inline-block;
  }

  .postfix {
    margin-left: .4rem;
  }
}
</style>
