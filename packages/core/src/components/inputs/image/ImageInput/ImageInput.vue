<template>
  <FileInput
    v-model="files"
    :name="name"
    :label="label"
    :multiple="false"
    :accept="accept"
    :required="required"
    :disabled="disabled"
    :dropInfo="dropInfo"
    :invalid="invalid"
    :dirty="dirty"
    :errors="!!modelValue ? modelValue.errors : []"
    @blur="$emit('blur', $event)"
  >
    <template #prepend>
      <div v-if="!disabled">
        <div class="preview">
          <BaseImage :image="imageToDisplay" />
          <div
            v-if="!modelValue || !modelValue?.sizes?.original"
            class="preview-placeholder-overlay"
          >
            <div class="message">
              <span>Vorschau</span>
              <small>Kein Bild ausgewählt</small>
            </div>
          </div>
          <div
            v-if="!!modelValue && modelValue.errors?.length > 0"
            class="error-overlay"
          />
        </div>
      </div>
    </template>
  </FileInput>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import FileInput from '@core/components/inputs/FileInput/FileInput.vue'
import { ImageForm } from '@core/models/image/imageForm'
import BaseImage from '@core/components/image/BaseImage/BaseImage.vue'
import { MinimalImage } from '@core/components/image/models/minimalImage'

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
     * The meta information of the field. This is provided by `useField` from `vee-validate`.
     */
    dirty?: boolean
    invalid?: boolean
    /**
     * Whether the field is required or not.
     */
    required?: boolean
    /**
     * The accept attribute of the input element. See https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept
     */
    accept?: string
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
  }>(),
  {
    modelValue: undefined,
    dirty: false,
    invalid: false,
    required: false,
    disabled: false,
    accept: 'image/*',
  }
)

const emit = defineEmits<{
  /**
   * Is emitted when files are dropped
   */
  (e: 'update:modelValue', imageForm?: ImageForm): void
  (e: 'blur', event: FocusEvent): void
}>()

const files = computed({
  get: () => props.modelValue?.file ? [props.modelValue.file] : [],
  set: async (files: File[]) => {
    const file = files[0]
    if (!file) {
      emit('update:modelValue', undefined)
      return
    }
    emit('update:modelValue', await ImageForm.fromFile(file))
  }
})

const getPlaceholderImage = (width: number, height: number) => {
  return `data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"%3E%3C/svg%3E`
}

const imageToDisplay = computed(() => {
  return new MinimalImage(-1, props.modelValue?.alt ?? 'Placeholder', props.modelValue?.sizes?.original ?? getPlaceholderImage(2, 1))
})
</script>
<style lang="scss" scoped>
.preview {
  position: relative;
  border-radius: var(--border-radius-300);
  aspect-ratio: var(--image-input-aspect-ratio, 2/1);
  max-height: 350px;
  overflow: hidden;


  .preview-placeholder-overlay {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
    text-align: center;
    background-color: var(--color-neutral-300);

    .message {
      display: flex;
      flex-flow: column;
      font-size: var(--font-size-500);
      font-weight: bolder;

      small {
        font-size: var(--font-size-300);
      }
    }
  }

  .error-overlay {
    position: absolute;
    background-color: var(--color-danger-100);
    opacity: .4;
    inset: 0;
  }
}
</style>
