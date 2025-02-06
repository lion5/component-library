<template>
  <FileInput
    v-model="value"
    :name="name"
    :label="label"
    :accept="accept"
    :multiple="multiple"
    :disabled="disabled"
    :drop-info="dropInfo"
    :dirty="meta.dirty"
    :invalid="meta.touched && !meta.valid"
    :required="required"
    :errors="errors"
    @blur="syncBlur"
  />
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import FileInput from '@core/components/inputs/FileInput/FileInput.vue'
import { RuleExpression, useField } from 'vee-validate'
import { Schema } from 'yup'

const props = withDefaults(
  defineProps<{
    /**
     * The value of the input field. Will not set the file input value.
     */
    modelValue?: File[]
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * The accept attribute of the input element. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
     */
    accept?: string
    /**
     * The multiple attribute of the input element. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#multiple
     */
    multiple?: boolean,
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     * Disables the input field.
     * @default false
     */
    disabled?: boolean,
    /**
     * Changes the information text that is displayed when an item is dragged over the component.
     * @default `label`
     */
    dropInfo?: string,
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<File[]>
  }>(),
  {
    errors: () => [],
    disabled: false,
    validationRules: undefined
  }
)

const emit = defineEmits<{
  (e: 'blur', event: FocusEvent): void
  (e: 'update:modelValue', value: File[]): void
}>()

const required = computed(() => (props.validationRules as Schema)?.spec?.optional === false)

const { value, meta, handleBlur, errors } = useField<File[]>(() => props.name, props.validationRules, {
  syncVModel: true
})

const syncBlur = (event: FocusEvent) => {
  handleBlur(event)
  emit('blur', event)
}
</script>
<style lang="scss" scoped>
</style>
