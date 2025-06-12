<template>
  <BaseBox
    v-if="localErrors.length > 0 || $slots.default"
    class="error-box"
    data-cy="portal-error-box"
  >
    <IconWarning />
    <div class="error-content">
      <slot>
        <ul v-if="localErrors.length > 1">
          <li v-for="localError in localErrors" :key="localError.message">
            {{ localError.message }}
          </li>
        </ul>
        <span v-else>
        {{ localErrors[0].message }}
      </span>
      </slot>
    </div>
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
    showIcon?: boolean
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
  --box-background-color: var(--color-danger-100);

  display: flex;
  gap: var(--space-sm);
  align-items: start;
  color: var(--color-danger-600);

  ul {
    margin: 0;
    padding-inline: 1rem;
  }
}
</style>
