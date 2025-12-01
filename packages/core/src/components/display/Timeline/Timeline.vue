<script setup lang="ts">
import TimelineItemComponent from '@core/components/display/Timeline/TimelineItem.vue'
import { TimelineEvent } from '@core/components/display/Timeline/timelineEvent'
import { DateFormat } from '@core/composables'
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    /**
     * Represents a collection of timeline events.
     * Each event in the array captures details and properties of a specific point or activity in time.
     *
     * @type {TimelineEvent[]}
     */
    events: TimelineEvent[]
    /**
     * Specifies the date time format
     *
     * It accepts a `DateFormat` type, allowing customization of time presentation.
     */
    timeFormat?: DateFormat,
    /**
     * Display events in reversed order
     */
    reverse?: boolean,
    orientation?: 'horizontal' | 'vertical'
  }>(),
  {
    timeFormat: 'dd.mm.YYYY HH:MM',
    reverse: false,
    orientation: 'vertical'
  }
)

defineSlots<{
  marker?: (props: { iconCls: string, event: TimelineEvent }) => void,
  dateTime?: (props: { dateTime: Date, dateTimeFormatted: string, event: TimelineEvent }) => void,
  title?: (props: { title: string, event: TimelineEvent }) => void,
  description?: (props: { description: string, event: TimelineEvent }) => void,
}>()

const events = computed(() => props.reverse ? props.events.toReversed() : props.events)

</script>

<template>
  <div :class="['timeline', orientation]">
    <TimelineItemComponent
      v-for="event in events"
      :key="event.dateTime?.toISOString() || event.title"
      :event="event"
      :time-format="timeFormat"
      :orientation="orientation"
    >
      <template
        v-for="(slot, name) in $slots"
        :key="name"
        #[name]="slotProps"
      >
        <slot :name="name" v-bind="slotProps" />
      </template>
    </TimelineItemComponent>
  </div>
</template>

<style scoped lang="scss">
.timeline {
  display: flex;
  flex-direction: column;
  padding: var(--space-sm);
}

.timeline.vertical {
  gap: var(--space-sm);
}

.timeline.horizontal {
  flex-direction: row;
  overflow-x: scroll;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
}

</style>
