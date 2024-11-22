<script setup lang="ts">
import { Address } from '@core/models/address'
import BaseInputV2 from '@core/components/inputs/BaseInputV2/BaseInputV2.vue'
import { ErrorMessage, RuleExpression, useField } from 'vee-validate'
import { useAddressUtils } from '@core/components/inputs/AddressInput/useAddressUtils'

const props = withDefaults(
  defineProps<{
    name: string
    address?: Address
    validationRules?: RuleExpression<unknown>
  }>(),
  {
    address: new Address(),
    validationRules: ''
  }
)

const emit = defineEmits<{
  (e: 'update:address', value: Address): void
  (e: 'input-finished'): void
}>()

const { value: address } = useField<Address>(
  props.name,
  props.validationRules,
  {
    syncVModel: 'address'
  }
)

const { isValidStreet } = useAddressUtils()
const streetValidationRules = (value: string) => {
  return (
    props.validationRules ||
    isValidStreet(value) ||
    'Geben Sie bitte Straßenname mit Hausnummer ein. Bsp.: An der Weberei 5'
  )
}

const partialInputFinished = () => {
  if (address.value.isComplete()) {
    emit('input-finished')
  }
}
// TODO: add rules for street and postalCode
</script>

<template>
  <div class="address-input-container">
    <div class="address-input">
      <BaseInputV2
        class="street-input"
        :name="`${name}.street`"
        v-model="address.street"
        label="Straße"
        :validation-rules="streetValidationRules"
        @blur="partialInputFinished"
      />
      <BaseInputV2
        class="postal-code-input"
        :name="`${name}.postalCode`"
        v-model="address.postalCode"
        label="PLZ"
        :validation-rules="validationRules"
        @blur="partialInputFinished"
      />
      <BaseInputV2
        :name="`${name}.city`"
        v-model="address.city"
        label="Stadt"
        :validation-rules="validationRules"
        @blur="partialInputFinished"
      />
    </div>
    <ErrorMessage class="error" :name="name" />
  </div>
</template>

<style scoped lang="scss">
.address-input-container {
  container-type: inline-size;
  container-name: address-input;
}

.address-input {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-sm);
}

@container (width > 40ch) {
  .address-input {
    grid-template-columns: 14ch 1fr;

    .street-input {
      grid-column: span 2;
    }
  }
}

@container (width > 80ch) {
  .address-input {
    grid-template-columns: 3fr 14ch 2fr;

    .street-input {
      grid-column: span 1;
    }
  }
}
</style>
