<template>
  <BaseInputV1Validated type="datetime-local" :name="name" :label="label" :max="maxValue">
    <IconCalendar />
  </BaseInputV1Validated>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from '@core/composables/useDate'
import IconCalendar from '@core/components/icons/IconCalendar.vue'
import BaseInputV1Validated from '@core/components/inputs/BaseInputV1Validated/BaseInputV1Validated.vue'

const props = withDefaults(
  defineProps<{
    name: string
    label: string
    /**
     * Maximum date to be selected in the datetime picker. Note that this does
     * not validate the input. Instead, the input should be validated using
     * vee-validate.
     */
    max?: Date
  }>(),
  {
    label: 'Zeit'
  }
)

const { getDateTimeLocalInputValue } = useDate()
const maxValue = computed(
  () => props.max && getDateTimeLocalInputValue(props.max)
)
</script>

<style scoped lang="scss">
.base-input-wrapper {
  & > :deep(input[type='datetime-local']) {
    &::-webkit-calendar-picker-indicator {
      z-index: 1;
      background: none;
    }

    &.failed ~ .bi-calendar {
      right: var(--space-lg);
    }

    & ~ i {
      // hide all icons and prevent click, to keep interactivity with native datetime picker
      pointer-events: none;
      z-index: 0;
    }

    & ~ .bi-calendar {
      position: absolute;
      right: var(--space-md);
      top: calc(var(--space-md) - 4px);
    }
  }
}
</style>
