<template>
  <NumberInput
    v-model="value"
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :label="label"
    :name="name"
    :required="required"
    :min="min"
    :max="max"
    :step="step"
    :min-fraction-digits="minFractionDigits"
    :max-fraction-digits="maxFractionDigits"
    :locale="locale"
    :step-buttons-variant="stepButtonsVariant"
    :label-type="labelType"
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
import { StepButtonsVariant } from '@core/components/inputs/NumberInput/stepButtonVariant'
import { InputLabelType } from '@core/components/inputs/BaseInputV3/inputLabelType'

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
    /**
     * The minimum value that can be entered.
     */
    min?: number
    /**
     * The step size to use when incrementing or decrementing the value.
     */
    step?: number
    /**
     * The maximum value that can be entered.
     */
    max?: number
    /**
     * The minimum number of fraction digits to use.
     */
    minFractionDigits?: number
    /**
     * The maximum number of fraction digits to use.
     */
    maxFractionDigits?: number
    /**
     * The locale to use for formatting the number.
     * Defaults to the browser's locale or 'de-DE' if not available.
     */
    locale?: string
    /**
     * Defines if and how step buttons should be displayed.
     */
    stepButtonsVariant?: StepButtonsVariant
    /**
     * Defines the style of the label.
     *
     * - floating: The label floats above the input when it has focus or a value.
     * - fixed: The label is always displayed above the input.
     * - hidden: The label is visually hidden but still available for screen readers.
     */
    labelType?: InputLabelType
  }>(),
  {
    validationRules: undefined
  }
)

defineSlots<{
  /**
   * Slot for the icon of the increment button.
   */
  incrementButtonIcon: void
  /**
   * Slot for the icon of the decrement button.
   */
  decrementButtonIcon: void
  /**
   * Slot for content to be displayed before the user input, inside the input field.
   */
  prefix: void
  /**
   * Slot for content to be displayed after the user input, inside the input field.
   */
  postfix: void
}>()

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
