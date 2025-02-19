<template>
  <BaseInputV3
    :model-value="value?.toString()"
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :name="name"
    :required="required"
    type="number"
    v-bind="$attrs"
    @update:model-value="handleInput"
    @blur="handleBlur"
  />
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { useField } from 'vee-validate'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import { computed } from 'vue'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    /**
     * The value of this field.
     */
    modelValue: number | undefined
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<number | undefined>
  }>(),
  {
    validationRules: undefined
  }
)

const handleInput = (inputValue?: string) => {
  if (inputValue === '' || inputValue == undefined) {
    setValue(undefined)
    return
  }
  setValue(Number(inputValue))
}

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { value, setValue, meta, errors, handleBlur } = useField<number | undefined>(props.name, props.validationRules, {
  syncVModel: true
})
</script>
<style scoped lang="scss">
</style>
