<template>
  <PortalValidationWrapper
    :validation-rules="validationRules"
    :error="error"
    :info-text="infoText"
  >
    <template #input="slotProps">
      <PortalFloatingLabelWrapper
        :id="id"
        class="portal-floating-textarea-group"
        :label="label"
      >
        <textarea
          :id="id"
          v-model="attribute"
          :class="{'form-control': true, ...slotProps.classes}"
          v-bind="$attrs"
          :placeholder="label"
          :data-cy="dataCy"
        />
      </PortalFloatingLabelWrapper>
    </template>
  </PortalValidationWrapper>
</template>
<script>
import PortalValidationWrapper from '@/base/components/input/wrapper/PortalValidationWrapper.vue'
import PortalFloatingLabelWrapper from '@/base/components/input/wrapper/PortalFloatingLabelWrapper.vue'

export default {
  name: 'PortalTextareaGroup',
  components: {
    PortalValidationWrapper,
    PortalFloatingLabelWrapper
  },
  inheritAttrs: false,
  props: {
    value: {
      type: String,
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
    error: {
      type: String,
      default: ''
    },
    infoText: {
      type: String,
      default: ''
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
        return this.value
      },
      set (attribute) {
        this.$emit('input', attribute)
      }
    }
  }
}
</script>
<style lang="scss">
@use "@/assets/styles/_variables.scss" as variables;

.portal-floating-textarea-group textarea {
  transition: border-color .15s ease-in-out, box-shadow .15s ease-in-out, max-height .4s ease-in-out;
  min-height: 40px;
  height: 10vw;

  &:focus {
    min-height: 100px;
  }
}
</style>
