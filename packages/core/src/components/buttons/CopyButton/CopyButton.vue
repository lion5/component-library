<template>
  <IconButton
    v-if="isAvailable"
    :class="{ success }"
    :disabled="success"
    @click="copyToClipboard"
  >
    <IconCopy />
    <span v-if="success">Kopiert <IconCheck /></span>
  </IconButton>
</template>
<script setup lang="ts">
import { IconButton, IconCheck } from '@core/components'
import IconCopy from '@core/components/icons/IconCopy.vue'
import { computed, ref } from 'vue'

const props = defineProps<{
  copyContent?: string
}>()

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
  console.log('clicked')
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
