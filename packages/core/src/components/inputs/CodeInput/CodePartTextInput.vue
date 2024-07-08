<template>
  <BaseInputWrapper :show-placeholder="true" :show-error-icon="false">
    <input
      :id="`code-input-${index}`"
      :class="{
        dirty: meta?.dirty,
        valid: meta?.touched && meta?.valid,
        invalid: meta?.touched && (!meta?.valid || errors)
      }"
      :value="code"
      :inputmode="inputMode"
      :maxlength="maxChars"
      :placeholder="placeholder"
      autocomplete="off"
      @input.capture="addInput"
      @keydown="handleKeydown"
      @paste.prevent="handlePasteEvent"
      :style="`--input-size: ${maxChars}ch;`"
    />
  </BaseInputWrapper>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { allowedCodeCharacters } from '@core/components/inputs/CodeInput/codeInputValidation'
import type { FieldMeta } from 'vee-validate'
import { BaseInputWrapper } from '@core/components'

const props = withDefaults(
  defineProps<{
    errors?: string[]
    value: string
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
}>()

const handlePasteEvent = (event: ClipboardEvent) => {
  const newCode = code.value + event.clipboardData?.getData('text/plain') || ''
  const normalizedNewCode = normalizeInputCode(newCode)
  emit('handle-paste', normalizedNewCode)
}

const addInput = (event: Event) => {
  const codeInput = (event.target as { value: string } | null)?.value || ''

  const index =
    (event.target as { selectionStart: number } | null)?.selectionStart || 0

  const currentCodeLength = code.value.length
  const normalizedNewCode = normalizeInputCode(codeInput)

  if (currentCodeLength !== normalizedNewCode.length) {
    if (index === 0) {
      emit('change-input', props.index - 1)
      console.log('change-input minus', props.index - 1)
    }

    if (index >= props.maxChars) {
      emit('change-input', props.index + 1)
      console.log('change-input plus', props.index + 1)
    }

    code.value = normalizedNewCode.substring(0, props.maxChars)
  }
}
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Backspace' && code.value.length === 0) {
    event.preventDefault()
    emit('change-input', props.index - 1)
    console.log('change-input minus', props.index - 1)
  }

  if (event.key !== 'Backspace' && code.value.length === props.maxChars) {
    emit('change-input', props.index + 1)
    console.log('change-input plus', props.index + 1)
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
  // Calculate the width of the input based on the number of characters with the factor 1.2 for extra space
  width: calc(1.2 * var(--input-size) + 2 * var(--space-sm));
  padding-block: var(--space-sm) !important;
  padding-inline: var(--space-sm) !important;
  text-align: center;
}
</style>
