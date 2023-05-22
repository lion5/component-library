<template>
  <ImageInputWrapper :name="name">
    <template #label>
      <img v-if="selectedImage" :src="src" alt="Vorschau" />
      <div>
        <IconCamera />
        <span>{{ uploadImageLabel }}</span>
      </div>
      <span class="error" v-if="errorMessage">{{ errorMessage }}</span>
    </template>
  </ImageInputWrapper>
</template>

<script setup lang="ts">
import { computed, toRef, watch } from 'vue'
import { useField } from 'vee-validate'
import ImageInputWrapper from '@/atoms/inputs/ImpageInputWrapper/ImageInputWrapper.vue'
import IconCamera from '@/icons/IconCamera.vue'

const props = defineProps<{
  name: string
  modelValue?: File
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', file: File): void
}>()

const name = toRef(props, 'name')
const { value: selectedImage, errorMessage } = useField<File>(name)

const src = computed(
  () => props.modelValue && URL.createObjectURL(props.modelValue)
)

const uploadImageLabel = computed(() =>
  props.modelValue ? 'Bild ändern' : 'Bild aufnehmen'
)

watch(selectedImage, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<style scoped lang="scss">
label {
  border: var(--input-border);
  padding: var(--space-sm);
  border-radius: var(--input-border-radius);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: var(--color-neutral-600);
  gap: var(--space-sm);

  img {
    max-height: 200px;
  }

  div {
    display: flex;
    gap: var(--space-sm);
  }
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-0);
}
</style>
