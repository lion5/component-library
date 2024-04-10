<template>
  <BaseBox class="info-box" v-if="infoMessage">
    <IconInfoCircle />
    <slot>{{ infoMessage }}</slot>
  </BaseBox>
</template>

<script lang="ts" setup>
import IconInfoCircle from '@core/icons/IconInfoCircle.vue'
import BaseBox from '@core/atoms/boxes/BaseBox/BaseBox.vue'

defineProps<{
  /**
   * the info message that shall be displayed
   */
  infoMessage?: string
}>()
</script>
<style lang="scss" scoped>
.info-box {
  --box-background-color: var(--color-primary-surface);
  --box-color: var(--color-font-1);
  i {
    margin-right: var(--space-sm);
  }
}
</style>
