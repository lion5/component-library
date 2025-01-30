<template>
  <BaseInputV3Validated :label="label" :max="maxValue" :name="name" :validationRules="validationRules"
                        type="datetime-local">


  </BaseInputV3Validated>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useDate } from '@core/composables/useDate'
import { BaseInputV3Validated } from '@core/components'
import { RuleExpression } from 'vee-validate'

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
    /**
     * Validation constraints of this field, see https://vee-validate.logaretm.com/v4/api/use-field/#usage-with-typescript.
     */
    validationRules?: RuleExpression<Date>
  }>(),
  {
    label: 'Zeit',
    validationRules: undefined
  }
)

const { getDateTimeLocalInputValue } = useDate()
const maxValue = computed(
  () => props.max && getDateTimeLocalInputValue(props.max)
)
</script>

<style lang="scss" scoped>
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
