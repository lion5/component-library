<script setup lang="ts">
import BasePillContent from '@core/components/display/BasePill/BasePillContent.vue'
import TooltipIcon from '@core/components/utils/TooltipIcon/TooltipIcon.vue'

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
  <TooltipIcon
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
  </TooltipIcon>
  <BasePillContent
    v-else
    :label="label"
    :iconStartCls="iconStartCls"
    :busy="busy"
  />

</template>

<style scoped lang="scss">
</style>
