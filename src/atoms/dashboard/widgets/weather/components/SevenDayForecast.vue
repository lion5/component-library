<template>
  <ul class="day-weathers">
    <li
      v-for="forecast in forecasts"
      :key="forecast.date.toISOString()"
      class="day-weather"
    >
      <div class="date">
        {{ getLongWeekday(forecast.date) }}
      </div>
      <WeatherIcon :icon-key="forecast.icon" />
      <div class="temperature">
        {{ getFormattedTemperature(forecast.minTemperature) }} -
        {{ getFormattedTemperature(forecast.maxTemperature) }}
      </div>
      <div class="wind">
        <WindDirection :degree="forecast.maxWindSpeedDirection" />
        {{ forecast.maxWindSpeed }} km/h
      </div>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { AggregatedWeather } from '@/atoms/dashboard/widgets/weather/models/aggregatedWeather'
import { useDate } from '@/composables'
import { useBrightSkyWeatherIcon } from '@/atoms/dashboard/widgets/weather/composables/useBrightSkyWeatherIcon'

defineProps<{
  forecasts: AggregatedWeather[]
}>()

const { getLongWeekday } = useDate()
const { getFormattedTemperature } = useBrightSkyWeatherIcon()
</script>

<style lang="scss" scoped>
.day-weathers {
  display: grid;
  grid-template-columns: auto auto auto auto;
  gap: var(--space-sm);
}

.day-weather {
  display: contents;
  box-shadow: var(--shadow-300);
  padding: var(--space-xs) var(--space-sm);
  align-items: start;
}
</style>
