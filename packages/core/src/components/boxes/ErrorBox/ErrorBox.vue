<template>
  <BaseBox
    v-if="localErrors.length > 0"
    class="error-box"
    data-cy="portal-error-box"
  >
    <IconWarning />
    <ul v-if="localErrors.length > 1">
      <li v-for="localError in localErrors" :key="localError.message">
        {{ localError.message }}
      </li>
    </ul>
    <span v-else>
      {{ localErrors[0].message }}
    </span>
  </BaseBox>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import IconWarning from '@core/components/icons/IconWarning.vue'
import BaseBox from '@core/components/boxes/BaseBox/BaseBox.vue'

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
  --box-background-color: var(--color-danger-surface-300);

  display: flex;
  gap: var(--space-sm);
  align-items: start;
  color: var(--color-danger-hover);

  ul {
    margin: 0;
    padding-inline: 1rem;
  }
}
</style>
