<template>
  <BaseInputV3
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :model-value="displayedCurrencyValue"
    :name="name"
    :required="required"
    type="tel"
    @blur="handleBlur"
    @input="setAsEuroValue"
  >
    <template #postfix>
      <IconEuro />
    </template>
  </BaseInputV3>
</template>
<script lang="ts" setup>
import { RuleExpression, useField } from 'vee-validate'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import IconEuro from '@core/components/icons/IconEuro.vue'
import { computed, ref, watch } from 'vue'
import { number, Schema } from 'yup'

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
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<number>
  }>(),
  {
    label: 'Betrag',
    euros: 0
  }
)

const displayedCurrencyValue = ref<string>('0')

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)


const { value, handleBlur, meta, setValue, errors } = useField<number>(
  () => props.name,
  props.validationRules ?? number().min(0, 'Der Betrag muss größer oder gleich 0 sein.'),
  {
    syncVModel: 'euros'
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

  meta.touched = true
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
