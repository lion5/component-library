<template>
  <div class="address-input">
    <PortalValidationWrapper :validation-rules="validationRules">
      <template #input="slotProps">
        <div class="floating-input-group">
          <input
            :id="'input-'+ id + '-address-postal-street'"
            v-model="address.street"
            :class="{'form-control': true, ...slotProps.classes}"
            type="text"
            placeholder="Straße"
            data-cy="input-street"
            @blur="partialInputFinished"
          >
          <label :for="'input-'+ id + '-address-postal-street'">Straße</label>
        </div>
      </template>
    </PortalValidationWrapper>
    <PortalValidationWrapper :validation-rules="validationRules">
      <template #input="slotProps">
        <div class="floating-input-group">
          <input
            :id="'input-'+ id + '-address-postal-code'"
            v-model="address.postalCode"
            :class="{'form-control': true, ...slotProps.classes}"
            type="text"
            placeholder="Postleitzahl"
            data-cy="input-postal-code"
            @blur="partialInputFinished"
          >
          <label :for="'input-'+ id + '-address-postal-code'">Postleitzahl</label>
        </div>
      </template>
    </PortalValidationWrapper>
    <PortalValidationWrapper :validation-rules="validationRules">
      <template #input="slotProps">
        <div class="floating-input-group">
          <input
            :id="'input-'+ id + '-address-city'"
            v-model="address.city"
            :class="{'form-control': true, ...slotProps.classes}"
            type="text"
            placeholder="Stadt"
            data-cy="input-city"
            @blur="partialInputFinished"
          >
          <label :for="'input-'+ id + '-address-city'">Stadt</label>
        </div>
      </template>
    </PortalValidationWrapper>
  </div>
</template>
<script>
import { Address } from '@/base/models/address'
import PortalValidationWrapper from '@/base/components/input/wrapper/PortalValidationWrapper.vue'

export default {
  name: 'PortalAddressInput',
  components: { PortalValidationWrapper },
  props: {
    value: {
      type: Address,
      required: true
    },
    id: {
      type: String,
      required: true
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
    address: {
      get () {
        return this.value
      },
      set (address) {
        this.$emit('input', address.clone())
      }
    }
  },
  methods: {
    partialInputFinished() {
      if (this.address.isComplete()) {
        this.$emit('input-finished')
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.address-input {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-sm);

  .floating-input-group-wrapper {
    flex: 1 0 auto;
  }
}
</style>
