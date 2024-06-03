<template>
  <div class="input">
    <div class="code-text-input">
      <div
        v-for="index in partNumber"
        :key="index"
        class="text-input-part-wrapper"
      >
        <div v-if="index !== 1" class="delimiter">-</div>
        <CodePartTextInput
          :errors="errors"
          :index="index - 1"
          :maxChars="partLength"
          :value="parts[index - 1]"
          :update-input="updateInput"
          :meta="meta"
          ref="inputRefs"
          @update:inputCode="handleInput(index - 1, $event)"
          @handle-paste="handlePaste"
          @change-input="handleChangeInput"
          @blur="handleBlur"
        />
      </div>
    </div>
    <ErrorMessage class="error" :name="name" />
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue'
import CodePartTextInput from './CodePartTextInput.vue'
import { ErrorMessage, useField } from 'vee-validate'

const props = defineProps({
  /**
   * Used to identify this field in a form (VeeValidate Form).
   */
  name: String,
  /**
   * The value of the input field. Mainly used for backwards compatibility to our old forms.
   * Please use the vee validate form to fill this field instead.
   */
  code: {
    type: String,
    required: false
  },
  /**
   * The length of each inputfield.
   */
  partLength: {
    type: Number,
    default: 4
  },
  /**
   * The number of inputfields.
   */
  partNumber: {
    type: Number,
    default: 2
  }
})

const updateInput = ref({})
const parts = ref([])
const inputRefs = ref([])

const {
  value: code,
  handleBlur,
  meta,
  errors
} = useField(() => props.name, undefined, {
  syncVModel: 'code'
})
watch(
  code,
  (newValue) => {
    updateParts(newValue)
  },
  { immediate: true }
)

function updateParts(value) {
  parts.value = []
  if (value === undefined) {
    return
  }
  for (let i = 0; i < props.partNumber; i++) {
    parts.value.push(
      value.slice(i * props.partLength, (i + 1) * props.partLength)
    )
  }
}

function handleInput(index, value) {
  parts.value[index] = value
  code.value = parts.value.join('')

  if (value.length >= props.partLength && index < props.partNumber - 1) {
    nextTick(() => {
      const nextInput = inputRefs.value[index + 1]?.$el.querySelector('input')
      nextInput && nextInput.focus()
    })
  }
}

function handlePaste(value) {
  updateParts(value)
}
function handleChangeInput(index) {
  if (index >= 0 && index < props.partNumber) {
    nextTick(() => {
      const targetInput = inputRefs.value[index]?.$el.querySelector('input')
      targetInput && targetInput.focus()
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
