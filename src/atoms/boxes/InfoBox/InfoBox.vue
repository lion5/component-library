<template>
  <BaseBox class="info-box" v-if="infoMessage">
    <IconInfoCircle />
    {{ infoMessage }}
  </BaseBox>
</template>

<script lang="ts" setup>
import IconInfoCircle from '@/icons/IconInfoCircle.vue'
import BaseBox from '@/atoms/boxes/BaseBox/BaseBox.vue'

defineProps<{
  /**
   * the info message that shall be displayed
   */
  infoMessage?: string
}>()
</script>
<style lang="scss" scoped>
.info-box {
  --box-background-color: var(--color-primary-100);
  color: var(--color-neutral-600);

  i {
    margin-right: var(--space-sm);
  }
}
</style>
