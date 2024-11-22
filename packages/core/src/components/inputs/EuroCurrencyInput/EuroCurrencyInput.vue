<template>
  <BaseInputV3
    :model-value="value"
    type="tel"
    :name="name"
    :label="label"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
    v-bind="$attrs"
    @blur="handleBlur"
    @update:model-value="setAsEuroValue"
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

const { value, handleBlur, meta, setValue } = useField<number>(
  () => props.name,
  (value) => value >= 0 || 'Der Betrag muss größer oder gleich 0 sein.',
  {
    syncVModel: 'euros'
  }
)

const setAsEuroValue = (value: string) => {
  const cleanedValue = value.replace(/[^0-9]/g, '')
  if (!cleanedValue) {
    setValue(0)
    return
  }
  const euroValue = parseInt(cleanedValue)
  setValue(euroValue)
}
</script>
<style scoped lang="scss"></style>
