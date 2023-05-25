<template>
  <div
    class="message-box"
    v-if="errorMessage || infoMessage"
    :class="classObject"
  >
    <span v-if="errorMessage"> <IconWarning /> {{ errorMessage }} </span>
    <span v-if="infoMessage"> <IconInfoCircle />{{ infoMessage }} </span>
    <slot v-else />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import IconInfoCircle from '@/icons/IconInfoCircle.vue'
import IconWarning from '@/icons/IconWarning.vue'

// TODO: only use this component for info message(s)?
const props = defineProps<{
  errorMessage?: string
  infoMessage?: string
}>()

const classObject = computed(() => ({
  error: !!props.errorMessage,
  info: !!props.infoMessage
}))
</script>

<style scoped lang="scss">
.message-box {
  padding: var(--space-sm);
  border-radius: var(--border-radius-300);

  span > i {
    margin-right: var(--space-sm);
  }

  &.error {
    background-color: var(--color-danger-surface-200);

    span {
      color: var(--color-danger);
    }
  }

  &.info {
    background-color: var(--color-info-surface);

    span {
      color: var(--color-neutral-600);
    }
  }
}
</style>
