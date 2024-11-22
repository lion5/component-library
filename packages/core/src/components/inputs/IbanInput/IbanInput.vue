<template>
  <BaseInputV3
    :name="name"
    :label="label"
    :model-value="displayedValue"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
    :errors="errors"
    v-bind="$attrs"
    @blur="handleBlur"
    @update:model-value="onInput"
  >
  </BaseInputV3>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { useIbanUtils } from '@core/composables/useIbanUtils'
import { BaseInputV3 } from '@core/components'

const props = withDefaults(
  defineProps<{
    iban?: string
    name: string
    label?: string
  }>(),
  {
    label: 'IBAN'
  }
)

const { toFormattedIBAN, toRawIBAN, isValidIBAN } = useIbanUtils()
const { value, handleBlur, meta, errors } = useField<string>(
  () => props.name,
  (iban: string) =>
    isValidIBAN(iban) || 'Bitte geben Sie eine gültige IBAN ein.',
  {
    syncVModel: 'iban',
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
