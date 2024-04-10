<template>
  <div :class="{ 'state-icon': true, active: active, inactive: !active }">
    <slot v-if="active" name="icon-active">
      <IconCheckCircleFill />
    </slot>
    <slot v-else name="icon-inactive">
      <IconXCircleFill />
    </slot>
  </div>
</template>
<script lang="ts" setup>
import IconCheckCircleFill from '@core/icons/IconCheckCircleFill.vue'
import IconXCircleFill from '@core/icons/IconXCircleFill.vue'

defineProps<{
  active: boolean
}>()
</script>
<style lang="scss" scoped>
.state-icon {
  text-align: left;
  font-size: 1.5rem;

  &.active {
    color: var(--color-success);
  }

  &.inactive {
    color: var(--color-danger);
  }
}
</style>
