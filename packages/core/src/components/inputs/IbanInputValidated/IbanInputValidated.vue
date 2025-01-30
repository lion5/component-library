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
import { RuleExpression, useField } from 'vee-validate'
import { useIbanUtils } from '@core/composables/useIbanUtils'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    iban?: string
    name: string
    label?: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<string>
  }>(),
  {
    label: 'IBAN',
    validationRules: undefined
  }
)

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const validIBANRule = (iban: string) => {
  return (isValidIBAN(iban) || 'Bitte geben Sie eine gültige IBAN ein.')
}

const { toFormattedIBAN, toRawIBAN, isValidIBAN } = useIbanUtils()
const { value, handleBlur, meta, errors } = useField<string>(
  () => props.name,
  props.validationRules || validIBANRule,
  {
    syncVModel: 'iban'
  }
)
const displayedValue = ref<string>('')

const onInput = (inputValue: string) => {
  value.value = toRawIBAN(inputValue)
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
