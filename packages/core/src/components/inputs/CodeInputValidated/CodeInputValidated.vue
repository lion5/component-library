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
          :errors="errors"
          :index="index - 1"
          :input-mode="inputMode"
          :maxChars="partLength"
          :meta="meta"
          :update-input="updateInput"
          :value="parts[index - 1]"
          @blur="handleBlur"
          @update:inputCode="handleInput(index - 1, $event)"
          @handle-paste="handlePaste"
          @change-input="handleChangeInput"
        />
      </div>
    </div>
    <ErrorMessage :name="name" class="error" />
  </div>
</template>

<script lang="ts" setup>
import { nextTick, ref, watch } from 'vue'
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
}>()


const updateInput = ref({})
const parts = ref<string[]>([])
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
    updateParts(newValue)
  },
  { immediate: true }
)

function updateParts(value: string) {
  parts.value = []
  for (let i = 0; i < props.partNumber; i++) {
    parts.value.push(
      value.slice(i * props.partLength, (i + 1) * props.partLength)
    )
  }
}

function handleInput(index: number, value: string) {
  parts.value[index] = value
  code.value = parts.value.join('')

  if (value.length >= props.partLength && index < props.partNumber - 1) {
    nextTick(() => {
      const nextInput = inputRefs.value[index + 1]?.$el.querySelector('input')
      nextInput?.focus()
    })
  }

  if (code.value.length === (props.partLength * props.partNumber)) {
    emit('input-finished', code.value)
  }
}

function handlePaste(value: string) {
  updateParts(value)
  const focusIndex = Math.min(
    Math.floor(value.length / props.partLength),
    props.partNumber - 1
  )

  nextTick(() => {
    const nextInput = inputRefs.value[focusIndex]?.$el.querySelector('input')
    nextInput?.focus()
  })
}

function handleChangeInput(index: number) {
  if (index >= 0 && index < props.partNumber) {
    nextTick(() => {
      const targetInput = inputRefs.value[index]?.$el.querySelector('input')
      targetInput?.focus()
    })
  }
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
