<template>
  <BaseInputWrapper>
    <input
      ref="currencyInputField"
      :id="name"
      :name="name"
      type="tel"
      :value="displayedCurrencyValue"
      placeholder="hidden"
      v-bind="$attrs"
      @input="handleInput"
      @keydown.delete="handleDelete"
      @blur="handleBlur"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
    <template #postfix-icon>
      <i class="bi bi-currency-euro"></i>
    </template>
  </BaseInputWrapper>
  {{ value }}
</template>
<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'
import { ref } from 'vue'

/**
 * See https://www.figma.com/file/t7Sf0lcqLOFsWf9IfczzDf/Bamberg-Gutschein?type=design&node-id=2215%3A9872&mode=design&t=HMv5F0wNEzgDKZeY-1
 */

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label?: string
  }>(),
  {
    label: 'Betrag'
  }
)

const INITIAL_VALUE_SIZE = 4
const internalValue = ref<string>('')
const currencyInputField = ref<HTMLInputElement | null>(null)
const displayedCurrencyValue = ref<string>('00,00')

const handleInput = (event: InputEvent) => {
  if (event.data == null || event.data.match(/[0-9]/) == null) {
    ;(event.target as HTMLInputElement).value = displayedCurrencyValue.value
    return
  }
  if (internalValue.value.length === 0 && event.data === '0') {
    ;(event.target as HTMLInputElement).value = displayedCurrencyValue.value
    return
  }
  handleAdd(event.data)
}

const fillWithZeros = (value: string) => {
  const missingZeros = INITIAL_VALUE_SIZE - value.length
  if (missingZeros <= 0) {
    return value
  }
  return '0'.repeat(missingZeros) + value
}

const formatCurrency = (value: string) => {
  const filledValue = fillWithZeros(value)
  return filledValue.slice(0, -2) + ',' + filledValue.slice(-2)
}

const handleAdd = (inputValue: string) => {
  internalValue.value = internalValue.value + inputValue
  displayedCurrencyValue.value = formatCurrency(internalValue.value)
  setValue(parseInt(internalValue.value))
}

const handleDelete = () => {
  if (internalValue.value.length === 0) {
    return
  }
  internalValue.value = internalValue.value.slice(0, -1)
  displayedCurrencyValue.value = formatCurrency(internalValue.value)
  setValue(parseInt(internalValue.value || '0'))
}
const { value, setValue, handleBlur } = useField<number>(
  props.name,
  (value) => value < 0,
  {
    initialValue: 0
  }
)
</script>
<style scoped lang="scss"></style>
