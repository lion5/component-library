<template>
  <div class="input">
    <label>{{ label }}</label>
    <div class="code-text-input">
      <div
        v-for="index in partNumber"
        :key="index"
        class="text-input-part-wrapper"
      >
        <div v-if="index !== 1" class="delimiter">-</div>
        <CodePartTextInput
          ref="inputRefs"
          :code="code"
          :errors="errors"
          :index="index - 1"
          :input-mode="inputMode"
          :maxChars="partLength"
          :meta="meta"
          :value="parts[index - 1]"
          @blur="handleBlur"
          @update:inputCode="handleInput(index - 1, $event)"
          @handle-paste="handlePaste"
          @change-input="handleNavigation"
          @wrong-field-input="handleWrongFieldInput"
        />
      </div>
    </div>
    <ErrorMessage :name="name" class="error" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import CodePartTextInput from './CodePartTextInput.vue'
import { ErrorMessage, useField } from 'vee-validate'

const props = withDefaults(
  defineProps<{
    /**
     * Used to identify this field in a form (VeeValidate Form).
     */
    name: string
    /**
     * The label of the input field.
     */
    label?: string
    /**
     * The value of the input field. Mainly used for backwards compatibility to our old forms.
     * Please use the vee validate form to fill this field instead.
     */
    code?: string
    /**
     * The length of each inputfield.
     */
    partLength?: number
    /**
     * The number of inputfields.
     */
    partNumber?: number
    /**
     * The type of inputfields.
     */
    inputMode?: 'text' | 'numeric' | undefined
  }>(),
  {
    label: '',
    code: '',
    partLength: 4,
    partNumber: 2,
    inputMode: 'text'
  }
)

const emit = defineEmits<{
  /**
   * if code is completely inputted
   * @param e
   * @param value
   */
  (e: 'input-finished', value: string): void,
  /**
   * update code event
   * @param e
   * @param value
   */
  (e: 'update:code', value: string): void,
}>()

const parts = computed<string[]>(() =>
  Array.from({ length: props.partNumber }, (_, i) =>
    code.value.slice(i * props.partLength, (i + 1) * props.partLength)
  )
)
const inputRefs = ref<InstanceType<typeof CodePartTextInput>[]>([])
const {
  value: code,
  handleBlur,
  meta,
  errors
} = useField<string>(() => props.name, undefined, {
  syncVModel: 'code'
})
watch(
  code,
  (newValue) => {
    checkAndEmitCompleteCode(newValue)
  },
  { immediate: true }
)

function handleInput(index: number, value: string) {
  code.value = code.value.slice(0, index * props.partLength) + value + code.value.slice((index + 1) * props.partLength)
  handleNavigation(index)
}

function handlePaste(value: string) {
  const maxLength = props.partLength * props.partNumber
  code.value = value.slice(0, maxLength)

  const focusIndex = Math.min(
    Math.floor(value.length / props.partLength),
    props.partNumber - 1
  )
  handleNavigation(focusIndex)
}

function checkAndEmitCompleteCode(value: string) {
  if (value.length === (props.partLength * props.partNumber)) {
    emit('input-finished', value)
  }
}

function handleWrongFieldInput({ index, key }: { index: number, key: string }) {
  const normalizedKey = key.toUpperCase()
  const position = code.value.length
  code.value = code.value + normalizedKey
  handleNavigation(index)
}

function handleNavigation(index: number) {
  if (index < 0 || index >= props.partNumber) {
    return
  }
  const targetInput = inputRefs.value[index]?.$el.querySelector('input')
  targetInput?.focus()
}
</script>

<style lang="scss" scoped>
.input {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);

  .error {
    color: var(--color-danger);
    font-size: var(--font-size-0);
  }

  .code-text-input {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .text-input-part-wrapper {
      display: flex;
      align-items: center;
    }

    .delimiter {
      padding: 0 1rem;
    }
  }
}
</style>
