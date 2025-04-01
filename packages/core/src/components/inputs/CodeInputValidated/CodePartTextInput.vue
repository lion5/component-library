<template>
  <BaseInputWrapper :show-error-icon="false" :show-placeholder="true">
    <input
      :id="`code-input-${index}`"
      :class="{
        dirty: meta?.dirty,
        valid: meta?.touched && meta?.valid,
        invalid: meta?.touched && (!meta?.valid || errors)
      }"
      :inputmode="inputMode"
      :maxlength="maxChars"
      :placeholder="placeholder"
      :style="`--input-size: ${maxChars}ch;`"
      :value="code"
      autocomplete="off"
      @keydown="handleKeydown"
      @input.capture="addInput"
      @paste.prevent="handlePasteEvent"
    />
  </BaseInputWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { allowedCodeCharacters } from '@core/components/inputs/CodeInputValidated/codeInputValidation'
import type { FieldMeta } from 'vee-validate'
import BaseInputWrapper from '@core/components/inputs/BaseInputWrapper/BaseInputWrapper.vue'

const props = withDefaults(
  defineProps<{
    errors?: string[]
    value: string
    code: string
    maxChars?: number
    index: number
    placeholderChar?: string
    meta: FieldMeta<string>
    inputMode: 'text' | 'numeric' | undefined
  }>(),
  {
    errors: undefined,
    maxChars: 4,
    placeholderChar: 'X'
  }
)

const emit = defineEmits<{
  (e: 'update:inputCode', value: string): void
  (e: 'handle-paste', value: string): void
  (e: 'change-input', value: number): void
  (e: 'wrong-field-input', value: { index: number, key: string }): void
}>()

const handlePasteEvent = (event: ClipboardEvent) => {
  const newCode = code.value + event.clipboardData?.getData('text/plain') || ''
  const normalizedNewCode = normalizeInputCode(newCode)
  emit('handle-paste', normalizedNewCode)
}

const addInput = (event: Event) => {
  // Find the first empty field index by checking the complete code
  const key = (event as InputEvent).data || ''
  const completeCode = props.code
  const firstEmptyFieldIndex = Math.floor(completeCode.length / props.maxChars)

  // Only redirect if we're adding a character, not deleting
  if (key && props.index !== firstEmptyFieldIndex) {
    // Clear the field immediately
    const input = event.target as HTMLInputElement
    input.value = ''
    code.value = ''

    emit('wrong-field-input', { index: firstEmptyFieldIndex, key })
    return
  }

  const codeInput = (event.target as { value: string } | null)?.value || ''

  const index =
    (event.target as { selectionStart: number } | null)?.selectionStart || 0

  const currentCodeLength = code.value.length
  const normalizedNewCode = normalizeInputCode(codeInput)

  if (currentCodeLength !== normalizedNewCode.length) {
    if (index === 0) {
      emit('change-input', props.index - 1)
    }

    if (index >= props.maxChars) {
      emit('change-input', props.index + 1)
    }

    code.value = normalizedNewCode.substring(0, props.maxChars)
  }
}
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Backspace' && (code.value.length === 1 || code.value.length === 0)) {
    event.preventDefault()
    code.value = ''
    emit('change-input', props.index - 1)
  }

  if (event.key !== 'Backspace' && code.value.length === props.maxChars) {
    emit('change-input', props.index + 1)
  }

  const key = event.key.toUpperCase()
  const regex = new RegExp(`[${allowedCodeCharacters}]`)
  if (
    !regex.test(key) &&
    !['BACKSPACE', 'ARROWLEFT', 'ARROWRIGHT', 'DELETE'].includes(
      event.key.toUpperCase()
    )
  ) {
    event.preventDefault()
  }
}

const normalizeInputCode = (code: string) => {
  if (code == undefined) {
    return ''
  }
  let newCode = code.toUpperCase()

  // Remove non code characters
  const regex = new RegExp(`[^${allowedCodeCharacters}]`, 'g')
  newCode = newCode.replace(regex, '')

  return newCode
}

const code = computed({
  get() {
    return normalizeInputCode(props.value)
  },
  set(value: string) {
    emit('update:inputCode', value)
  }
})
const placeholder = computed(() => props.placeholderChar.repeat(props.maxChars))
</script>

<style lang="scss" scoped>
input {
  // Calculate the width of the input based on the number of characters with the factor 1.5 for extra space
  width: calc(1 * var(--input-size) + 2 * var(--space-md)) !important;
  padding-block: var(--space-sm) !important;
  padding-inline: var(--space-sm) !important;
  text-align: center;
  font-family: monospace;
}
</style>
