<template>
  <BaseInputWrapper>
    <input
      :id="name"
      :class="{
        dirty: meta.dirty,
        valid: meta.touched && meta.valid,
        invalid: meta.touched && !meta.valid
      }"
      :name="name"
      type="tel"
      :value="displayedCurrencyValue"
      placeholder="hidden"
      v-bind="$attrs"
      @input="onRawInput"
      @keydown.delete="onDelete"
      @blur="handleBlur"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
    <template #postfix-icon>
      <i class="bi bi-currency-euro"></i>
    </template>
  </BaseInputWrapper>
</template>
<script setup lang="ts">
import { ErrorMessage, useField } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'
import { ref, watch } from 'vue'
import { useCurrencyFormat } from '@core/components/inputs/CentCurrencyInput/useCurrencyFormat'

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
    /**
     * The value of the input field. Mainly used for backwards compatibility to our old forms.
     * Please use the vee validate form to fill this field instead.
     */
    cents?: number
  }>(),
  {
    label: 'Betrag'
  }
)

/**
 * The internal string representation of the number.
 * Used to easily add and remove characters and to format the displayed value and the convert to the number value.
 */
const internalValue = ref<string>('')
const displayedCurrencyValue = ref<string>('00,00')

const onRawInput = (event: Event) => {
  onInput(event as InputEvent)
}
const onInput = (event: InputEvent) => {
  if (event.data == null || event.data.match(/[0-9]/) == null) {
    ;(event.target as HTMLInputElement).value = displayedCurrencyValue.value
    return
  }
  if (internalValue.value.length === 0 && event.data === '0') {
    ;(event.target as HTMLInputElement).value = displayedCurrencyValue.value
    return
  }
  onAdd(event.data)
}

/**
 * Adds the given input value to the internal value.
 * Sets the displayed currency value to the formatted internal value.
 * Sets the value of the field as a number.
 *
 * @param inputValue The value to be added to the internal value.
 */
const onAdd = (inputValue: string) => {
  internalValue.value = internalValue.value + inputValue
  value.value = parseInt(internalValue.value)
}

/**
 * Deletes the last character of the internal value.
 * If the internal value is empty, nothing happens.
 * Sets the displayed currency value to the formatted internal value.
 * Sets the value of the field as a number.
 */
const onDelete = () => {
  if (internalValue.value.length === 0) {
    return
  }
  internalValue.value = internalValue.value.slice(0, -1)
  value.value = parseInt(internalValue.value || '0')
}

const { value, handleBlur, meta } = useField<number>(
  () => props.name,
  (value) => value >= 0 || 'Der Betrag muss größer oder gleich 0 sein.',
  {
    syncVModel: 'cents'
  }
)

watch(
  value,
  (newValue: number) => {
    if (newValue == null) {
      return
    }
    internalValue.value = newValue.toString()
    const { toEuroStringFromCentString } = useCurrencyFormat()
    displayedCurrencyValue.value = toEuroStringFromCentString(
      internalValue.value
    )
  },
  { immediate: true }
)
</script>
<style scoped lang="scss"></style>
