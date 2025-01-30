<template>
  <MultiselectInput
    :id="id"
    v-model="value"
    :dirty="meta.dirty"
    :entity-name="entityName"
    :errors="errors"
    :invalid="!meta.valid"
    :label="label"
    :name="name"
    :options="options"
    :placeholder="placeholder"
    :required="required"
    :searchable="searchable"
    @blur="handleBlur"
  />
</template>

<script generic="LabelType" lang="ts" setup>
import { type RuleExpression, useField } from 'vee-validate'
import MultiselectInput from '@core/components/inputs/MultiselectInput/MultiselectInput.vue'
import { SelectOption } from '@core/components/inputs/BaseSelect/selectOption'
import { computed } from 'vue'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    modelValue?: InputType[]
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
    validationRules?: RuleExpression<InputType[]>
  }>(),
  {
    entityName: 'Optionen',
    searchable: true,
    validationRules: undefined
  }
)
type InputType = string | number | boolean | null

const required = computed(() => (props.validationRules as Schema)?.spec.optional === false)

const { value, meta, handleBlur, errors } = useField<InputType[]>(
  () => props.name,
  props.validationRules,
  {
    syncVModel: true
  }
)
</script>
