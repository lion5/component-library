<template>
  <BaseInputV3
    :model-value="displayedCurrencyValue"
    type="tel"
    :name="name"
    :label="label"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
    :errors="errors"
    @input="setAsEuroValue"
    @blur="handleBlur"
  >
    <template #postfix>
      <IconEuro />
    </template>
  </BaseInputV3>
</template>
<script setup lang="ts">
import { useField } from 'vee-validate'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import IconEuro from '@core/components/icons/IconEuro.vue'
import { ref, watch } from 'vue'

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
    euros?: number
  }>(),
  {
    label: 'Betrag'
  }
)

const displayedCurrencyValue = ref<string>('0')

const { value, handleBlur, meta, setValue, errors } = useField<number>(
  () => props.name,
  (value) => value >= 0 || 'Der Betrag muss größer oder gleich 0 sein.',
  {
    syncVModel: 'euros',
  }
)

const setAsEuroValue = (event: InputEvent) => {
  const inputValue = (event.target as HTMLInputElement).value
  const cleanedValue = inputValue.replace(/[^0-9]/g, '')
  if (!cleanedValue) {
    syncValueWithElements(0, event.target as HTMLInputElement)
    return
  }
  const euroValue = parseInt(cleanedValue)
  syncValueWithElements(euroValue, event.target as HTMLInputElement)
}

const syncValueWithElements = (newValue: number, target: HTMLInputElement) => {
  displayedCurrencyValue.value = newValue.toString()
  target.value = newValue.toString()
  if (newValue === value.value) {
    return
  }
  setValue(newValue)
}

watch(
  value,
  (newValue: number) => {
    if (newValue == null) {
      return
    }
    displayedCurrencyValue.value = newValue.toString()
  },
  { immediate: true }
)
</script>
