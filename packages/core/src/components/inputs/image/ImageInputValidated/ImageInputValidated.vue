<template>
  <ImageInput
    v-model="value"
    :name="name"
    :label="label"
    :dirty="meta.dirty"
    :errors="errors"
    :invalid="meta.touched && !meta.valid"
    :required="required"
    :accept="constraints?.mimeTypes?.join(',')"
    :disabled="disabled"
    :dropInfo="dropInfo"
    @blur="syncBlur"
  />
</template>
<script lang="ts" setup>
import { ImageForm } from '@core/models/image/imageForm'
import ImageInput from '@core/components/inputs/image/ImageInput/ImageInput.vue'
import { useField } from 'vee-validate'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { computed, watch } from 'vue'
import { mixed, Schema, ValidationError } from 'yup'
import { useFileUtils } from '@core/composables'

const props = withDefaults(
  defineProps<{
    /**
     * The value of the input field. Will not set the file input value.
     */
    modelValue?: ImageForm
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The text to be displayed within a floating label of this field.
     */
    label: string
    /**
     * Disables the reaction on drag over, drag leave and drop events. So it disables the component.
     * Disables the input field.
     */
    disabled?: boolean,
    /**
     * Changes the information text that is displayed when an item is dragged over the component.
     * @default `label`
     */
    dropInfo?: string,
    /**
     * The constraints an image must fulfill.
     * Set automatically the validation rules to fulfill these constraints.
     */
    constraints?: ImageConstraints
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     * This will override the validation rules extracted from constraints prop
     */
    validationRules?: Schema<ImageForm>
  }>(),
  {
    modelValue: undefined,
    disabled: false,
    validationRules: undefined
  }
)


const emit = defineEmits<{
  (e: 'blur', event: FocusEvent): void
  (e: 'update:modelValue', value?: ImageForm): void
}>()

const required = computed(() => (props.validationRules as Schema)?.spec?.optional === false)

const internalValidationRules = computed(() => {
  const constraints = props.constraints
  if (!constraints) {
    return undefined
  }

  return mixed<ImageForm>()
    .test(
      'imageFile',
      '',
      (value) => validateImageConstraints(constraints, value)
    )
})

const validateImageConstraints = (constraints: ImageConstraints, imageForm?: ImageForm) => {
  const errors = []
  const file = imageForm?.file
  if (file) {
    const expectedMimeTypes = constraints.mimeTypes
    if (expectedMimeTypes && !expectedMimeTypes.includes(file.type)) {
      errors.push(new ValidationError(
        `Die Datei beinhaltet einen falschen Dateityp (${file.type}). Zugelassen sind nur die folgenden Dateitypen ${expectedMimeTypes.join(', ')}.`
      ))
    }
    const expectedSizeInBytes = constraints.sizeInBytes
    if (expectedSizeInBytes && file.size > expectedSizeInBytes) {
      const { displayFileSize } = useFileUtils()
      errors.push(new ValidationError(
        `Die maximale Dateigröße beträgt ${displayFileSize(expectedSizeInBytes)}. Die Dateigröße des Bildes beträgt ${displayFileSize(file.size)}.`
      ))
    }
  }
  const expectedWidth = constraints.width
  const image = imageForm?.image
  if (image) {
    if (expectedWidth && image.width !== expectedWidth) {
      errors.push(new ValidationError(
        `Die Breite des eingegebenen Bildes misst ${image.width} px. Die akzeptierte Breite sind ${expectedWidth} px.`
      ))
    }
    const expectedHeight = constraints.height
    if (expectedHeight && image.height !== expectedHeight) {
      errors.push(new ValidationError(
        `Die Höhe des eingegebenen Bildes misst ${image.height} px. Die akzeptierte Höhe sind ${expectedHeight} px.`
      ))
    }
  }
  if (errors.length === 0) {
    return true
  }
  return new ValidationError(errors)
}

const combinedValidation = computed(() => {
  if (props.validationRules && internalValidationRules.value) {
    return internalValidationRules.value.concat(props.validationRules)
  }
  if (props.validationRules) {
    return props.validationRules
  }
  if (internalValidationRules.value) {
    return internalValidationRules.value
  }
  return undefined
})

const { value, meta, handleBlur, errors } = useField<ImageForm>(
  () => props.name,
  combinedValidation.value,
  {
    syncVModel: true
  }
)

watch(errors, () => {
    if (!value.value) {
      return
    }
    value.value.errors = errors.value.map((error) => new Error(error))
  },
  {
    immediate: true
  }
)

const syncBlur = (event: FocusEvent) => {
  handleBlur(event)
  emit('blur', event)
}
</script>
<style lang="scss" scoped>
</style>
