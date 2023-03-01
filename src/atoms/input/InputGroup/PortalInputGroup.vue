<template>
  <PortalValidationWrapper
    wrapper-class="portal-input-group"
    :validation-rules="validationRules"
    :api-error-id="apiErrorId"
  >
    <template #input="slotProps">
      <div class="input-wrapper">
        <div
          v-if="prefix"
          class="prefix"
        >
          <!-- @slot The content inside this slot is prepended to the input field -->
          <slot name="prefix">
            {{ prefix }}
          </slot>
        </div>
        <div class="floating-input-group">
          <input
            :id="id"
            v-model="attribute"
            :class="{'form-control': true, ...slotProps.classes}"
            v-bind="$attrs"
            :type="type"
            :placeholder="label"
            :data-cy="dataCy"
          >
          <label :for="id">{{ label }}</label>
        </div>
        <div
          v-if="postfix"
          class="postfix"
        >
          <!-- @slot The content inside this slot is appended to the input field -->
          <slot name="postfix">
            {{ postfix }}
          </slot>
        </div>
      </div>
    </template>
  </PortalValidationWrapper>
</template>
<script lang="ts">
import {merchantMixin} from '@/merchant/mixins'
import PortalValidationWrapper from '@/base/components/input/wrapper/PortalValidationWrapper.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  name: 'PortalInputGroup',
  components: {PortalValidationWrapper},
  mixins: [merchantMixin],
  inheritAttrs: false,
  props: {
    /**
     * @model
     * The type need to be specified by a additional type prop.
     */
    value: {
      type: [String, Number],
      default: null
    },
    /**
     * The id of is applied to the input field and used for reference with the label's "for" attribute.
     */
    id: {
      type: String,
      required: true
    },
    /**
     * The content between of the input field's label.
     */
    label: {
      type: String,
      required: true
    },
    /**
     * The infoText is displayed under the input field.
     */
    infoText: {
      type: String,
      default: ''
    },
    /**
     * The prefix is displayed at the before the input starts. This prop is overwritten when the prefix slot is set.
     */
    prefix: {
      type: String,
      default: ''
    },
    /**
     * The postfix is displayed at the after the input ends. This prop is overwritten when the postfix slot is set.
     */
    postfix: {
      type: String,
      default: ''
    },
    /**
     * This prop is applied to the input field directly to make testing with cypress easier.
     */
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
    },
    /**
     * Links this field to the api error responses, see {@link PortalValidationWrapper.apiErrorId}
     */
    apiErrorId: {
      type: String,
      default: ''
    },
    upperCase: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: 'text'
    }
  },
  computed: {
    attribute: {
      get() {
        return this.value
      },
      set(attribute: string | number) {
        // Fix: convert number values from string to number
        const newValue = this.type === 'number' ? +attribute : attribute
        if (typeof newValue === 'string' && this.upperCase) {
          this.$emit('input', newValue.toUpperCase())
          return
        }
        this.$emit('input', newValue)
      }
    }
  },
  methods: {
    clear() {
      this.attribute = ''
    }
  }
})
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as variables;

.input-wrapper {
  display: flex;
  width: 100%;

  .postfix, .prefix {
    background-color: var(--color-primary);
    color: var(--color-light);
    padding: .5rem;
    height: var(--input-field-height);
  }

  .floating-input-group {
    flex-grow: 1;

    input {
      display: inline-block;
      height: var(--input-field-height);
    }
  }
}
</style>
