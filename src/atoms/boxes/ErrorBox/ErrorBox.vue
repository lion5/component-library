<template>
  <div
    v-if="localErrors.length > 0"
    class="error-box"
    data-cy="portal-error-box"
  >
    <ul v-if="localErrors.length > 1">
      <li v-for="localError in localErrors" :key="localError.message">
        {{ localError.message }}
      </li>
    </ul>
    <span v-else>
      {{ localErrors[0].message }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    error?: Error
    errors?: Error[]
  }>(),
  {
    errors: () => []
  }
)

const localErrors = computed(() => {
  const wrappedError = props.error != null ? [props.error] : []
  return [...wrappedError, ...props.errors]
})
</script>
<style lang="scss" scoped>
.error-box {
  color: var(--color-danger-hover);
  background-color: var(--color-danger-surface-300);
  padding: var(--space-sm);
  border-radius: var(--border-radius-300);
}
</style>
