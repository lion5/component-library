<script lang="ts" setup>
import { Address } from '@core/models/address'
import BaseInputV3Validated from '@core/components/inputs/BaseInputV3Validated/BaseInputV3Validated.vue'
import { ErrorMessage } from 'vee-validate'
import { useAddressUtils } from '@core/components/inputs/AddressInputValidated/useAddressUtils'
import { Schema, string } from 'yup'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * Global validations for all fields.
     */
    validationRules?: Schema<string>
    /**
     * The field name of streets
     */
    streetFieldName?: string
    /**
     * The field name of postal codes
     */
    postalCodeFieldName?: string
    /**
     * The field name of cities
     */
    cityFieldName?: string
  }>(),
  {
    validationRules: undefined
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

const { isValidStreet, isValidPostalCode } = useAddressUtils()

const streetValidationRules = computed(() => {
  return string()
    .nullable()
    .test(
      props.streetFieldName ?? `${props.name}.street`,
      'Geben Sie bitte Straßenname mit Hausnummer ein. Bsp.: An der Weberei 5',
      (value) => value === undefined || value === null || isValidStreet(value)
    )
})

const postalCodeValidationRules = computed(() => {
  return string()
    .nullable()
    .test(
      props.postalCodeFieldName ?? `${props.name}.postalCode`,
      'Geben Sie bitte eine gültige Postleitzahl ein. Bsp.: 12345',
      (value) => value === undefined || value === null || isValidPostalCode(value)
    )
})

function combineValidationRules(
  defaultRules: Schema<string | null | undefined>,
  customRules: Schema<string> | undefined
): Schema<string | null | undefined> | undefined {
  if (defaultRules && customRules) {
    return defaultRules.concat(customRules)
  }
  return customRules || defaultRules
}

const combinedStreetValidation = computed(() =>
  combineValidationRules(streetValidationRules.value, props.validationRules)
)

const combinedPostalCodeValidation = computed(() =>
  combineValidationRules(postalCodeValidationRules.value, props.validationRules)
)

const partialInputFinished = () => {
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
        :model-value="address.street"
        :name="streetFieldName ?? `${name}.street`"
        :validation-rules="combinedStreetValidation"
        class="street-input"
        label="Straße"
        @blur="partialInputFinished"
        @update:model-value="onStreetInput"
      />
      <BaseInputV3Validated
        :model-value="address.postalCode"
        :name="postalCodeFieldName ?? `${name}.postalCode`"
        :validation-rules="combinedPostalCodeValidation"
        class="postal-code-input"
        label="PLZ"
        @blur="partialInputFinished"
        @update:model-value="onPostalCodeInput"
      />
      <BaseInputV3Validated
        :model-value="address.city"
        :name="cityFieldName ?? `${name}.city`"
        :validation-rules="validationRules"
        label="Stadt"
        @blur="partialInputFinished"
        @update:model-value="onCityInput"
      />
    </div>
    <ErrorMessage :name="name" class="error" />
  </div>
</template>

<style lang="scss" scoped>
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
