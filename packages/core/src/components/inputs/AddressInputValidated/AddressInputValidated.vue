<script setup lang="ts">
import { Address } from '@core/models/address'
import BaseInputV3Validated from '@core/components/inputs/BaseInputV3Validated/BaseInputV3Validated.vue'
import { ErrorMessage, RuleExpression } from 'vee-validate'
import { useAddressUtils } from '@core/components/inputs/AddressInputValidated/useAddressUtils'

withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * Global validations for all fields.
     */
    validationRules?: RuleExpression<string>
  }>(),
  {
    validationRules: ''
  }
)

const emit = defineEmits<{
  /**
   * if address is completely inputted
   * @param e
   */
  (e: 'input-finished'): void,
  (e: 'update:modelValue', value: Address): void
}>()


const address = defineModel<Address>({
  required: false,
  default: () => new Address()
})


const { isValidStreet } = useAddressUtils()
const streetValidationRules = (value: string) => {
  return (
    isValidStreet(value) ||
    'Geben Sie bitte Straßenname mit Hausnummer ein. Bsp.: An der Weberei 5'
  )
}

const partialInputFinished = () => {
  console.log('partialInputFinished', address.value)
  if (address.value.isComplete()) {
    emit('input-finished')
  }
}

const onStreetInput = (street: string) => {
  address.value.street = street
  address.value = address.value.clone()
}
const onPostalCodeInput = (postalCode: string) => {
  address.value.postalCode = postalCode
  address.value = address.value.clone()
}

const onCityInput = (city: string) => {
  address.value.city = city
  address.value = address.value.clone()
}
</script>

<template>
  <div class="address-input-container">
    <div class="address-input">
      <BaseInputV3Validated
        class="street-input"
        :name="`${name}.street`"
        :model-value="address.street"
        label="Straße"
        :validation-rules="validationRules || streetValidationRules"
        @update:model-value="onStreetInput"
        @blur="partialInputFinished"
      />
      <BaseInputV3Validated
        class="postal-code-input"
        :name="`${name}.postalCode`"
        :model-value="address.postalCode"
        label="PLZ"
        :validation-rules="validationRules"
        @update:model-value="onPostalCodeInput"
        @blur="partialInputFinished"
      />
      <BaseInputV3Validated
        :name="`${name}.city`"
        :model-value="address.city"
        label="Stadt"
        :validation-rules="validationRules"
        @update:model-value="onCityInput"
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

  & > * {
    height: min-content;
  }
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
