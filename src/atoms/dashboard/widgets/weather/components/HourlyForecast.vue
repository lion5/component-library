<template>
  <ul class="hourly-weather-forecast">
    <li v-for="forecast in forecasts" :key="forecast.timestamp">
      <span class="time">
        {{ getFormattedWeekdayHour(forecast.timestamp) }}
      </span>
      <WeatherIcon :icon-key="forecast.icon" />
      <span>{{ getFormattedTemperature(forecast.temperature) }}</span>
      <WindDirection class="wind-direction" :degree="forecast.wind_direction" />
      {{ getFormattedNumber(forecast.wind_speed) }} km/h
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { BrightSkyForecastWeatherItem } from '@/atoms/dashboard/widgets/weather/models/brightSkyForecastWeather'
import { useDate } from '@/composables/useDate'
import { useNumber } from '@/composables/useNumber'
import { useBrightSkyWeatherIcon } from '@/atoms/dashboard/widgets/weather/composables/useBrightSkyWeatherIcon'

defineProps<{
  forecasts: BrightSkyForecastWeatherItem[]
}>()

const { getFormattedNumber } = useNumber()
const { getFormattedWeekdayHour } = useDate()
const { getFormattedTemperature } = useBrightSkyWeatherIcon()
</script>

<style lang="scss" scoped>
.hourly-weather-forecast {
  display: flex;
  gap: var(--space-sm);
  padding-block-end: var(--space-md);
  line-height: 1;
  overflow-x: auto;
  white-space: nowrap;

  li {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-xs);
    background-color: var(--color-neutral-200);
    padding: var(--space-sm);
  }

  .time {
    font-size: var(--font-size-0);
    white-space: nowrap;
  }

  .weather-icon {
    font-size: var(--font-size-6);
  }
}
</style>
