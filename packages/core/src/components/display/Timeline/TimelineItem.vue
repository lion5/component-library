<script setup lang="ts">
import { DateFormat, useDateUtils } from '@core/composables'
import { TimelineEvent } from '@core/components/display/Timeline/timelineEvent'
import { BaseIcon, BaseTooltip } from '@core/components'

defineProps<{
  event: TimelineEvent,
  timeFormat: DateFormat,
  orientation: 'horizontal' | 'vertical'
}>()

const { toDateTimeString } = useDateUtils()
</script>

<template>
  <div
    class="timeline-event"
    :class="[{ 'is-active': event.active }, orientation]"
  >
    <div class="marker">
      <slot name="marker" :iconCls="event.iconCls" :event="event">
        <BaseIcon :icon="event.iconCls" />
      </slot>
    </div>
    <div class="line line1"></div>
    <div class="line line2"></div>
    <div class="time">
      <slot
        v-if="event.dateTime"
        name="dateTime"
        :dateTime="event.dateTime"
        :dateTimeFormatted="toDateTimeString(event.dateTime, timeFormat)"
        :event="event"
      >
        <span v-if="timeFormat!=='timeAgo'">
          {{ toDateTimeString(event.dateTime, timeFormat) }}
        </span>
        <BaseTooltip v-else style="--tooltip-right: 0">
          <template #trigger>
            {{ toDateTimeString(event.dateTime, timeFormat) }}
          </template>
          <template #content>
            {{ toDateTimeString(event.dateTime, 'dd.mm.YYYY HH:MM') }}
          </template>
        </BaseTooltip>
      </slot>
    </div>
    <div class="title">
      <slot name="title" :title="event.title" :event="event">
        {{ event.title }}
      </slot>
    </div>
    <div class="description">
      <slot name="description" :description="event.description" :event="event">
        {{ event.description }}
      </slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.timeline-event {
  --_icon-size: 2rem;
  --_font-color: var(--timeline-font-color, var(--color-neutral-700));
  --_inactive-color: var(--timeline-color-inactive, var(--color-neutral-300));
  --_active-color: var(--timeline-color-active, var(--color-primary));
  --_line: 2px solid var(--_inactive-color);
  display: grid;
  max-width: 60ch;

  .marker {
    aspect-ratio: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--_inactive-color);
    border-radius: var(--border-radius-round);
    line-height: 0;
  }

  .time, :deep(.tooltip-trigger) {
    align-self: center;
    font-size: var(--font-size-0) !important;
    font-weight: var(--font-weight-bold);
    color: var(--_font-color);
  }

  .description {
    font-size: var(--font-size-0);
    color: var(--_font-color);
  }

  &.is-active {
    .marker {
      background-color: var(--_active-color);
      color: var(--color-font-inverted);
    }
  }
}

.timeline-event.vertical {
  grid-template-columns: var(--_icon-size) 1fr max-content;
  grid-template-areas:
    "marker title time"
    "line1 description description";
  column-gap: var(--space-sm);

  .line1 {
    border-left: var(--_line);
    justify-self: center;
    margin-block-start: var(--space-sm);
  }

  &:last-child {
    .line1 {
      display: none;
    }
  }

  &.is-active:has(+ .timeline-event.is-active) {
    .line1 {
      border-left-color: var(--_active-color);
    }
  }
}

.timeline-event.horizontal {
  grid-template-columns: 10ch var(--_icon-size) 10ch;
  grid-template-rows: max-content var(--_icon-size) max-content auto;
  grid-template-areas:
    "time time time"
    "line1 marker line2"
    "title title title"
    "description description description";
  row-gap: var(--space-xs);
  text-align: center;
  scroll-snap-align: center;

  .marker, .line, .time, .title, .description {
    padding-inline: var(--space-xs);
  }

  .line1, .line2 {
    border-block-end: var(--_line);
    align-self: center;
    width: 100%;
  }

  &:first-child {
    .line1 {
      display: none;
    }
  }

  &:last-child {
    .line2 {
      display: none;
    }
  }

  &.is-active {
    .line1 {
      border-block-end-color: var(--_active-color);
    }
  }

  &:has(+ .timeline-event.is-active) {
    .line2 {
      border-block-end-color: var(--_active-color);
    }
  }
}

.marker {
  grid-area: marker;
}

.line1 {
  grid-area: line1;
}

.line2 {
  grid-area: line2;
}

.time {
  grid-area: time;
}

.title {
  grid-area: title;
  align-self: center;
}

.description {
  grid-area: description;
}
</style>
