<template>
  <SelectInput
    :id="id"
    :name="name"
    :label="label"
    :entity-name="entityName"
    :placeholder="placeholder"
    :searchable="searchable"
    :options="options"
    :errors="errors"
    :dirty="meta.dirty"
    :invalid="!meta.valid"
    v-model="value"
    @blur="handleBlur"
  />
</template>

<script setup lang="ts" generic="LabelType">
import { type RuleExpression, useField } from 'vee-validate'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'
import { SelectInput } from '@core/components'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    modelValue?: InputType
    /**
     * The options that should be available for selection. Contain a `value` (key to identify the option)
     * and a text to be displayed.
     */
    options: SelectOption<LabelType>[]
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The option that should be pre-selected by default. If unset, no option is pre-selected.
     *
     * @deprecated Use `modelValue` instead.
     */
    defaultOption?: SelectOption<LabelType>
    /**
     * The unique ID of the HTML element.
     */
    id: string
    /**
     * The label text to be displayed next to the field.
     */
    label: string
    /**
     * A placeholder to be displayed if no option is selected. By default, the label + ' wählen' is displayed.
     * @deprecated not used anymore
     */
    placeholder?: string
    /**
     * The name of the entity that is being selected.
     */
    entityName?: string
    /**
     * Whether the user is able to use the search functionality.
     */
    searchable?: boolean
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<InputType>
  }>(),
  {
    entityName: 'Optionen',
    searchable: true,
    validationRules: ''
  }
)
type InputType = string | number | boolean | undefined | null
const { value, meta, handleBlur, errors } = useField<InputType>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true
  }
)
</script>

<style>
@import 'vue-multiselect/dist/vue-multiselect.css';
</style>
