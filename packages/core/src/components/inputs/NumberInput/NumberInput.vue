<template>
  <BaseInputV3
    :model-value="displayValue"
    :dirty="dirty"
    :errors="errors"
    :invalid="invalid"
    :label="label"
    :name="name"
    :required="required"
    :label-type="labelType"
    type="string"
    inputmode="numeric"
    @input="handleInput"
  >
    <template v-if="stepButtonsVariant === 'inside'" #fixed-postfix>
      <div class="icon-buttons-inside-wrapper">
        <IconButton
          label="Zahl vermindern"
          data-testid="increment-button"
          @click="onIncrement"
        >
          <slot name="increment-button-icon">
            <BaseIcon icon="bi-plus-lg" />
          </slot>
        </IconButton>
        <IconButton
          label="Zahl erhöhen"
          data-testid="decrement-button"
          @click="onDecrement"
        >
          <slot name="decrement-button-icon">
            <BaseIcon icon="bi-dash-lg" />
          </slot>
        </IconButton>
      </div>
    </template>
    <template v-if="stepButtonsVariant === 'outside'" #before-input>
      <IconButton
        label="Zahl vermindern"
        data-testid="decrement-button"
        @click="onDecrement"
      >
        <slot name="decrement-button-icon">
          <BaseIcon icon="bi-dash-lg" />
        </slot>
      </IconButton>
    </template>
    <template v-if="stepButtonsVariant === 'outside'" #after-input>
      <IconButton
        label="Zahl erhöhen"
        data-testid="increment-button"
        @click="onIncrement"
      >
        <slot name="increment-button-icon">
          <BaseIcon icon="bi-plus-lg" />
        </slot>
      </IconButton>
    </template>
  </BaseInputV3>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import BaseInputV3 from '@core/components/inputs/BaseInputV3/BaseInputV3.vue'
import IconButton from '@core/components/buttons/IconButton/IconButton.vue'
import { BaseIcon } from '@core/components'
import { InputLabelType } from '@core/components/inputs/BaseInputV3/inputLabelType'
import { StepButtonsVariant } from '@core/components/inputs/NumberInput/stepButtonVariant'

/**
 * The value of this field.
 */
const modelValue = defineModel<number | undefined>()
const displayValue = ref('')


const props = withDefaults(defineProps<{
  /**
   * Used to identify this field in a form (VeeValidate Form).
   */
  name: string
  /**
   * The text to be displayed within a floating label of this field.
   */
  label: string
  dirty?: boolean
  invalid?: boolean
  required?: boolean
  errors?: Error[] | string[]
  min?: number
  step?: number
  max?: number
  minFractionDigits?: number
  maxFractionDigits?: number
  locale?: string
  stepButtonsVariant?: StepButtonsVariant
  labelType?: InputLabelType
}>(), {
  locale: typeof navigator !== 'undefined' ? navigator.language : 'de-DE',
  stepButtonsVariant: 'none',
  labelType: 'floating'
})

const isDecimalRemoved = (newValue: string, oldValue: string): boolean => {
  const decimalSeparator = separators.value.decimal
  return oldValue.includes(decimalSeparator) && !newValue.includes(decimalSeparator)
}

const formatNumber = (value?: number): string => {
  if (value === undefined || isNaN(value)) {
    return ''
  }
  return new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: props.minFractionDigits,
    maximumFractionDigits: props.maxFractionDigits,
    useGrouping: true
  }).format(value)
}

const separators = computed(() => {
  const parts = new Intl.NumberFormat(props.locale, {
    minimumFractionDigits: 1,
    useGrouping: true
  }).formatToParts(12345.6)
  const decimal = parts.find(p => p.type === 'decimal')?.value ?? '.'
  const group = parts.find(p => p.type === 'group')?.value ?? ','
  return { decimal, group }
})

const cleanDecimalSeparators = (value: string): string => {
  // Handle multiple decimal separators - keep only the first one
  const decimalParts = value.split(separators.value.decimal)
  if (decimalParts.length < 2) return value
  if (decimalParts[0] == '') {
    return ''
  }
  return decimalParts[0] + separators.value.decimal + decimalParts[1]
}

const cutOffFractionDigits = (value: string): string => {
  const parts = value.split(separators.value.decimal)
  if (parts.length < 2) return value
  const integerPart = parts[0]
  let fractionPart = parts[1]
  if (props.maxFractionDigits !== undefined && fractionPart.length > props.maxFractionDigits) {
    fractionPart = fractionPart.slice(0, props.maxFractionDigits)
  }
  return integerPart + separators.value.decimal + fractionPart
}

const cleanInput = (input: string): number | undefined => {
  const normalizedDecimalSeparator = '.'
  let cleaned = cleanDecimalSeparators(input)
  cleaned = cutOffFractionDigits(cleaned)
  cleaned = cleaned
    .replace(new RegExp(`\\${separators.value.group}`, 'g'), '') // Remove group separators
    .replace(new RegExp(`\\${separators.value.decimal}`), normalizedDecimalSeparator) // Normalize decimal separator to '.'
    .replace(/[^\d.,]/g, '')


  return cleaned ? parseFloat(cleaned) : undefined
}

const handleInput = (event: InputEvent) => {
  const target = event.target as HTMLInputElement
  const typedChar = event.data
  let inputValue = target.value
  const decimalRemoved = isDecimalRemoved(inputValue, displayValue.value)
  if (decimalRemoved) {
    inputValue = displayValue.value
  }
  const cleaned = cleanInput(inputValue)
  const formatted = formatNumber(cleaned)

  // Update the input value immediately with cleaned version
  const cursorPos = calculateCursorPosition(inputValue, formatted, typedChar, target.selectionStart || 0)
  displayValue.value = formatted
  modelValue.value = cleaned

  requestAnimationFrame(() => {
    target.value = formatted
    target.setSelectionRange(cursorPos, cursorPos)
  })
}

const calculateCursorPosition = (oldValue: string, newValue: string, typedChar: string | null, pos: number): number => {
  // if (decimalRemoved) {
  //   // If the decimal separator was removed, place the cursor at the end of the integer part
  //   // Example: 1,234|.56 -> 1234|.56
  //   const decimalIndex = newValue.indexOf(separators.value.decimal)
  //   return decimalIndex === -1 ? newValue.length : decimalIndex
  // }
  if (typedChar == separators.value.decimal) {
    // If the user just typed the decimal separator, place the cursor right after it
    // Example: 1|,0 -> 1,|,0 -> 1,|0
    return pos
  }

  if (!typedChar && newValue.at(pos - 1) === separators.value.group) {
    // Pointing to a group selector after deletion, move cursor one position to the left
    // Example: 1.234|.567,89 -> 1.23|.567,89 -> 123.|567,89 -> 123|.567,89
    return pos - 1
  }

  if (oldValue.length - 1 === newValue.length && oldValue.at(0) === '0' && pos === 2) {
    // If the user added a digit to a value that was "0", move the cursor one position to the left
    // Example: 0|,0 -> 01|,0 -> 1|,0
    return pos - 1
  }

  const countGroupSeparatorsBeforePos = (value: string, position: number): number => {
    let count = 0
    for (let i = 0; i < position; i++) {
      if (value[i] === separators.value.group) {
        count++
      }
    }
    return count
  }

  const oldGroupCount = countGroupSeparatorsBeforePos(oldValue, pos)
  const newGroupCount = countGroupSeparatorsBeforePos(newValue, pos)
  // If the number of group separators before the cursor has changed, adjust the cursor position
  if (oldGroupCount !== newGroupCount) {
    const diff = newGroupCount - oldGroupCount
    return pos + diff
  }

  return pos
}

const onIncrement = () => {
  const step = props.step ?? 1
  const newValue = (modelValue.value ?? 0) + step
  if (props.max !== undefined && newValue > props.max) {
    return
  }
  modelValue.value = newValue
  displayValue.value = formatNumber(modelValue.value)
}

const onDecrement = () => {
  const step = props.step ?? 1
  const newValue = (modelValue.value ?? 0) - step
  if (props.min !== undefined && newValue < props.min) {
    return
  }
  modelValue.value = newValue
  displayValue.value = formatNumber(modelValue.value)
}
</script>
<style scoped lang="scss">
.icon-buttons-inside-wrapper {
  --icon-button-font-size: var(--font-size-0);
  --icon-button-padding: var(--space-xs);
  --icon-button-radius: var(--border-radius-100);
}
</style>
