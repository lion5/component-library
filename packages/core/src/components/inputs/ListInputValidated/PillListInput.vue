<script setup lang="ts">/**
 * Input for a list of pills. Each pill can be deleted.
 */

import { PillInputItem } from '@core/components/inputs/ListInputValidated/pillInputItem'
import PillInput from '@core/components/inputs/PillInput/PillInput.vue'

defineProps<{
  /**
   * The pill input items to display.
   */
  pillInputItems: PillInputItem[]
}>()

const emit = defineEmits<{
  /**
   * Emits when a pill is deleted.
   *
   * @property {string | number} key - the key of the pill.
   */
  (e: 'delete', key: string | number): void
}>()

const onDelete = (key: string | number) => {
  emit('delete', key)
}
</script>

<template>
  <div class="pill-list-input">
    <PillInput
      v-for="item in pillInputItems"
      :key="item.key"
      :busy="item.busy"
      :label="item.label"
      :icon-cls="item.iconCls"
      @delete="onDelete(item.key)"
    />
  </div>
</template>

<style scoped lang="scss">
.pill-list-input {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-300);
}
</style>
