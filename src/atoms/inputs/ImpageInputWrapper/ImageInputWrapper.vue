<template>
  <label class="image-input-wrapper" :for="name">
    <slot name="label" />
    <input
      type="file"
      accept="image/*"
      capture="environment"
      :id="name"
      :name="name"
      @change="handleChange"
    />
  </label>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate'
import { toRef, watch } from 'vue'

const props = defineProps<{ name: string; modelValue?: File }>()

const emit = defineEmits<{
  (e: 'update:modelValue', image: File): void
}>()

const name = toRef(props, 'name')
const { value, handleChange } = useField<File>(name)
watch(value, (newValue: File) => {
  if (!newValue) {
    return
  }
  emit('update:modelValue', newValue)
})
</script>
<style lang="scss" scoped>
input[type='file'] {
  display: none;
}
label {
  cursor: pointer;
  -webkit-user-select: none;
}
</style>
