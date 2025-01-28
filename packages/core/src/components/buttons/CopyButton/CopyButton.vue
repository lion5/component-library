<template>
  <IconButton
    v-if="isAvailable"
    :class="{ success }"
    :disabled="success"
    @click="copyToClipboard"
  >
    <IconCopy v-if="extensiveSuccess || !success" />
    <span v-if="success">
      <span v-if="extensiveSuccess">Kopiert </span>
      <IconCheck />
    </span>
  </IconButton>
</template>
<script setup lang="ts">
import { IconButton, IconCheck } from '@core/components'
import IconCopy from '@core/components/icons/IconCopy.vue'
import { computed, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * The content to copy to the clipboard.
     */
    copyContent?: string
    /**
     * Shows a more extensive success message.
     */
    extensiveSuccess?: boolean
  }>(),
  {
    extensiveSuccess: false
  }
)

const success = ref(false)
const notifySuccess = () => {
  success.value = true
  setTimeout(() => {
    success.value = false
  }, 2000)
}

const isAvailable = computed(
  () => navigator && navigator.clipboard && !!props.copyContent
)
const copyToClipboard = () => {
  if (!props.copyContent) return
  navigator.clipboard.writeText(props.copyContent)
  notifySuccess()
}
</script>
<style lang="scss" scoped>
.success {
  display: flex;
  gap: var(--space-xs);
  color: var(--color-success);
}
</style>
