<template>
  <ValidationProvider
    v-slot="{ classes, errors, required }"
    ref="provider"
    :rules="validationRules"
    :class="['floating-input-group-wrapper', wrapperClass]"
    :vid="apiErrorId"
    :name="apiErrorId"
    slim
  >
    <slot
      name="input"
      :classes="{...classes, 'has-error': !!errors[0], 'required': required}"
    />
    <div class="input-message-wrapper">
      <!-- VeeValidate error message (from api or local from validation rules) -->
      <small
        v-if="errors[0]"
        class="error"
      >
        {{ errors[0] }}
      </small>
      <!-- additional field description -->
      <small
        v-if="infoText"
        class="info"
      >
        {{ infoText }}
      </small>
    </div>
  </ValidationProvider>
</template>

<script>
import Vue from 'vue'
import { ValidationProvider } from 'vee-validate'
import { ApiError } from '@/base/exceptions'

export default Vue.extend({
  name: 'PortalValidationWrapper',
  components: { ValidationProvider },
  props: {
    /**
     * The built-in or custom VeeValidate rules separated by a pipe "|", e.g. "required|email" for a required email field.
     * Alternatively, rules may be passed as an object of the following form (example): "{ min: 3, max: 10 }".
     * Both custom or built-in rules must be declared in `src/configuration/validation/index.js` before using them.
     */
    validationRules: {
      type: [String, Object],
      default: ''
    },
    /**
     * A field error coming from store logic (backend interaction), preferably an Object extending the {@link ApiError} type.
     */
    error: {
      type: [String, ApiError],
      default: ''
    },
    /**
     * Some informative text to be permanently shown below the field.
     */
    infoText: {
      type: String,
      default: ''
    },
    /**
     * Additional class(es) to be added to the wrapper component.
     */
    wrapperClass: {
      type: String,
      default: ''
    },
    /**
     * The name of the field used for identifying the field in errors (responses) coming from the API.
     */
    apiErrorId: {
      type: String,
      default: ''
    }
  },
  methods: {
    /**
     * Invokes the validation provider manually. Can be used by components that do not invoke an input event e.g. {@link VueMultiselect}
     * @param input the input to be validated.
     */
    async validate (input) {
      await this.$refs.provider.validate(input)
      await this.setDirty()
    },
    /**
     * Sets the dirty flag of the validation provider to true.
     */
    async setDirty () {
      await this.$refs.provider.setFlags({ dirty: true })
    },
    async syncValue (value) {
      await this.$refs.provider.syncValue(value)
    }
  }
})
</script>
<style lang="scss" scoped>
@use '@/assets/styles/_variables.scss' as variables;

.info, .error {
  display: block;
}

.error {
  color: var(--color-danger);
}

input.dirty.invalid ~ .info {
  color: var(--color-danger);
}
</style>
