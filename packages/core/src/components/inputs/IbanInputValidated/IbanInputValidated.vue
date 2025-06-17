<template>
  <BaseInputV3
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :model-value="displayedValue"
    :name="name"
    :required="required"
    v-bind="$attrs"
    @blur="handleBlur"
    @update:model-value="onInput"
  >
  </BaseInputV3>
</template>
<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { useIbanUtils } from '@core/composables/useIbanUtils'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { mixed, Schema, StringSchema } from 'yup'

const props = withDefaults(
  defineProps<{
    iban?: string
    name: string
    label?: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: StringSchema
  }>(),
  {
    label: 'IBAN',
    validationRules: undefined
  }
)

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const internalValidationRules = computed(() => {
  return mixed<string>()
    .test(
      'iban',
      'Bitte geben Sie eine gültige IBAN ein.',
      (value) => {
        if(value) {
          return isValidIBAN(value)
        } else {
          return true
        }
      }
    )
})

const combinedValidation = computed(() => {
  if (props.validationRules && internalValidationRules.value) {
    return internalValidationRules.value.concat(props.validationRules)
  }
  if (props.validationRules) {
    return props.validationRules
  }
  if (internalValidationRules.value) {
    return internalValidationRules.value
  }
  return undefined
})

const { toFormattedIBAN, toRawIBAN, isValidIBAN } = useIbanUtils()
const { value, handleBlur, meta, errors } = useField<string>(
  () => props.name,
  computed(() => combinedValidation.value),
  {
    syncVModel: 'iban'
  }
)
const displayedValue = ref<string>('')

const onInput = (inputValue?: string) => {
  value.value = toRawIBAN(inputValue ?? '')
}

watch(
  value,
  (iban) => {
    displayedValue.value = toFormattedIBAN(iban)
  },
  {
    immediate: true
  }
)
</script>
