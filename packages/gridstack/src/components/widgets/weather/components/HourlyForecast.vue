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
import { BrightSkyForecastWeatherItem } from '@gridstack/components/widgets/weather/models/brightSkyForecastWeather'
import { useDate, useNumber } from '@lion5/component-library'
import { useBrightSkyWeatherIcon } from '@gridstack/components/widgets/weather/composables/useBrightSkyWeatherIcon'
import WeatherIcon from '@gridstack/components/widgets/weather/components/WeatherIcon.vue'
import WindDirection from '@gridstack/components/widgets/weather/components/WindDirection.vue'

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
