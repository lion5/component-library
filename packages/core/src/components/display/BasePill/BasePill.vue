<script setup lang="ts">
import BasePillContent from '@core/components/display/BasePill/BasePillContent.vue'
import BaseTooltip from '@core/components/utils/BaseTooltip/BaseTooltip.vue'

withDefaults(
  defineProps<{
    label: string
    iconStartCls?: string,
    busy?: boolean,
    tooltipText?: string,
    tooltipShowOnHover?: boolean
  }>(),
  {
    iconStartCls: undefined,
    busy: false,
    tooltipText: undefined,
    tooltipShowOnHover: true
  }
)
</script>

<template>
  <BaseTooltip
    v-if="tooltipText"
    :tooltip-text="tooltipText"
    :show-on-hover="tooltipShowOnHover"
  >
    <template #tooltipTriggerContent>
      <BasePillContent
        :label="label"
        :iconStartCls="iconStartCls"
        :busy="busy"
      />
    </template>
  </BaseTooltip>
  <BasePillContent
    v-else
    :label="label"
    :iconStartCls="iconStartCls"
    :busy="busy"
  />

</template>

<style scoped lang="scss">
</style>
