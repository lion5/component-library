<template>
  <NumberInput
    v-model="value"
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :name="name"
    :required="required"
    v-bind="$attrs"
    @blur="handleBlur"
  >
    <template #prefix>
      <slot name="prefix" />
    </template>
    <template #postfix>
      <slot name="postfix" />
    </template>
    <template #incrementButtonIcon>
      <slot name="incrementButtonIcon" />
    </template>
    <template #decrementButtonIcon>
      <slot name="decrementButtonIcon" />
    </template>
  </NumberInput>
</template>
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { useField } from 'vee-validate'
import { computed } from 'vue'
import { Schema } from 'yup'
import NumberInput from '@core/components/inputs/NumberInput/NumberInput.vue'

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

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { value, meta, errors, handleBlur } = useField<number | undefined>(
  props.name,
  props.validationRules,
  {
    syncVModel: true
  }
)
</script>
<style scoped lang="scss"></style>
