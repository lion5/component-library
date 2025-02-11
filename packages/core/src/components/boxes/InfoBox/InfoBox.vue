<template>
  <BaseBox v-if="infoMessage" class="info-box">
    <IconInfoCircle />
    <slot>{{ infoMessage }}</slot>
  </BaseBox>
</template>

<script lang="ts" setup>
import IconInfoCircle from '@core/components/icons/IconInfoCircle.vue'
import BaseBox from '@core/components/boxes/BaseBox/BaseBox.vue'

defineProps<{
  /**
   * the info message that shall be displayed
   */
  infoMessage?: string
}>()
</script>
<style lang="scss" scoped>
.info-box {
  --box-background-color: var(--color-primary-200);
  --box-color: var(--color-font-1);
  i {
    margin-right: var(--space-sm);
  }
}
</style>
