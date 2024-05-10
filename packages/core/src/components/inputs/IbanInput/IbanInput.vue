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
      type="text"
      :value="displayedValue"
      placeholder="hidden"
      v-bind="$attrs"
      @input="onRawInput"
      @blur="handleBlur"
    />
    <label :for="name">{{ label }}</label>
    <ErrorMessage class="error" :name="name" />
    <template #postfix-icon>
      <i class="bi bi-currency-euro"></i>
    </template>
  </BaseInputWrapper>
</template>
<script lang="ts" setup>
import { ref, watch } from 'vue'
import { useField, ErrorMessage } from 'vee-validate'
import { useIbanUtils } from '@core/composables'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

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

const { value, handleBlur, meta } = useField<string>(
  () => props.name,
  (iban: string) =>
    isValidIBAN(iban) || 'Bitte geben Sie eine gültige IBAN ein.',
  {
    syncVModel: 'iban'
  }
)
const displayedValue = ref<string>('')
const { toFormattedIBAN, toRawIBAN, isValidIBAN } = useIbanUtils()

const onRawInput = (event: Event) => {
  onInput(event as InputEvent)
}
const onInput = (event: InputEvent) => {
  const inputValue = (event.target as HTMLInputElement).value
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
