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
<script setup lang="ts">
import type { RuleExpression } from 'vee-validate'
import { useField } from 'vee-validate'
import { computed, toRef } from 'vue'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

type InputValue = string | number | null

defineOptions({ inheritAttrs: false })

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
const localName = toRef(props, 'name')
const { value: inputValue, errorMessage } = useField<InputValue>(
  localName,
  props.validationRules,
  {
    initialValue: props.modelValue
  }
)

const emit = defineEmits<{
  (event: 'update:modelValue', value: InputValue): void
}>()

const classObject = computed(() => ({
  invalid: errorMessage.value
}))

const emitValue = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value
  emit('update:modelValue', newValue)
}
</script>
