<template>
  <BaseInputWrapper>
    <input
      :id="name"
      :name="name"
      v-model="inputValue"
      @input="emitValue"
      v-bind="$attrs"
      :type="type"
      :placeholder="label"
      :data-cy="dataCy"
      :class="classObject"
    />
    <label :for="name">{{ label }}</label>
    <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
    <slot />
  </BaseInputWrapper>
</template>
<script lang="ts">
export default {
  inheritAttrs: false
}
</script>
<script setup lang="ts">
import { useField } from 'vee-validate'
import type { RuleExpression } from 'vee-validate'
import { computed, toRef } from 'vue'
import BaseInputWrapper from '@/atoms/inputs/BaseInputWrapper/BaseInputWrapper.vue'

type InputValue = string | number | null

const props = withDefaults(
  defineProps<{
    /**
     * @model
     * The value (v-model) of the field. Updates of the value will be emitted via 'update:modelValue'.
     * The type of the field may be specified via the `type` prop.
     */
    modelValue?: InputValue
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * Unique identifier of the input element itself, used for testing (e.g., with Cypress).
     */
    dataCy?: string
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<InputValue>
    /**
     * The type of the HTML `input` element, e.g. "text", "password", or "number".
     */
    type?: string
  }>(),
  {
    modelValue: undefined,
    type: 'text',
    dataCy: '',
    validationRules: ''
  }
)

// required for VeeValidate to notice name changes
const name = toRef(props, 'name')
const { value: inputValue, errorMessage } = useField<InputValue>(
  name,
  props.validationRules,
  {
    initialValue: props.modelValue
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: InputValue): void
}>()

const classObject = computed(() => ({
  failed: errorMessage.value
}))

const emitValue = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', newValue)
}
</script>
