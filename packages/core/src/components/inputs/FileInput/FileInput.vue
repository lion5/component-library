<template>
  <FileDropArea
    :class="['file-input', { invalid }, { dirty }, { required }, { disabled }]"
    :disabled="disabled"
    :multiselect="multiple"
    :dropInfo="dropInfo || label"
    @new-files="onFileDrop"
  >
    <div class="input-group">
      <slot name="prepend" />
      <div class="input">
        <PillListInput
          v-if="files.length > 0"
          :pill-input-items="filePills"
          @delete="onDelete"
        />
        <BaseButton
          :disabled="disabled"
          @click="() => $refs.fileInput.click()"
        >
          <template #icon-left>
            <BaseIcon icon="bi-upload" />
          </template>
          <label>
            {{ label }}<span v-if="required" class="required-identification">*</span>
            <input
              ref="fileInput"
              :name="name"
              type="file"
              :required="required"
              :multiple="multiple"
              :accept="accept"
              :disabled="disabled"
              @change="onFileInput"
            >
          </label>
        </BaseButton>
      </div>
      <ErrorBox :errors="errorObjects" class="error-box" />
    </div>
  </FileDropArea>
</template>
<script lang="ts" setup>
import FileDropArea from '@core/components/dragdrop/FileDropArea/FileDropArea.vue'
import { computed } from 'vue'
import PillListInput from '@core/components/inputs/ListInputValidated/PillListInput.vue'
import BaseButton from '@core/components/buttons/BaseButton/BaseButton.vue'
import BaseIcon from '@core/components/icons/BaseIcon.vue'
import ErrorBox from '@core/components/boxes/ErrorBox/ErrorBox.vue'
import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'

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
     * The meta information of the field. This is provided by `useField` from `vee-validate`.
     */
    dirty?: boolean
    invalid?: boolean
    /**
     * Whether the field is required or not.
     */
    required?: boolean
    /**
     * The errors of the field. This is provided by `useField` from `vee-validate`.
     */
    errors?: Error[] | string[]
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
    dropInfo?: string
  }>(),
  {
    modelValue: () => [],
    dirty: false,
    invalid: false,
    required: false,
    errors: () => [],
    disabled: false
  }
)

const emit = defineEmits<{
  /**
   * Is emitted when files are dropped
   */
  (e: 'update:modelValue', files: File[]): void
  (e: 'blur', event: FocusEvent): void
}>()

const files = computed({
  get: () => props.modelValue,
  set: (value: File[]) => {
    emit('update:modelValue', value)
  }
})


const onFileDrop = (files: File[]) => {
  emit('update:modelValue', files)
  emit('blur', new FocusEvent('blur'))
}

const onFileInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  const files = target.files ? Array.from(target.files) : []
  if (files.length === 0) {
    return
  }
  emit('update:modelValue', files)
  emit('blur', new FocusEvent('blur'))
}

const filePills = computed(() => files.value.map((file) => new PillInputItem(file.name, file.name, false)))

const onDelete = (id: string | number) => {
  files.value = files.value.filter((file) => file.name !== id)
}

const errorObjects = computed(() => {
  if (!props.invalid) {
    return []
  }
  return props.errors.map((error) => {
    if (typeof error === 'string') {
      return new Error(error)
    }
    return error
  })
})
</script>
<style lang="scss" scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-400);

  .input {
    display: flex;
    gap: var(--space-400);
  }
}

label {
  display: flex;
  gap: var(--space-300);
  align-items: center;
  cursor: pointer;
}

.required-identification {
  color: var(--color-danger);
  line-height: .5;
}

input[type="file"] {
  display: none;
}

.file-input {
  &.invalid :deep(.base-button) {
    outline: 2px solid var(--color-danger);

    &:hover {
      outline: 2px solid var(--color-danger-hover);
    }
  }
  &.disabled label {
    cursor: default;
  }
}
</style>
