<template>
  <BaseBox v-if="successMessage" class="success-box">
    <BaseIcon icon="bi-check-circle-fill" />
    <slot>{{ successMessage }}</slot>
  </BaseBox>
</template>

<script lang="ts" setup>
import BaseBox from '@core/components/boxes/BaseBox/BaseBox.vue'
import { BaseIcon } from '@core/components'

defineProps<{
  /**
   * the success message that shall be displayed
   */
  successMessage?: string
}>()
</script>
<style lang="scss" scoped>
.success-box {
  --box-background-color: var(--color-success-200);
  --box-color: var(--color-font-1);

  i {
    margin-right: var(--space-sm);
  }
}
</style>
