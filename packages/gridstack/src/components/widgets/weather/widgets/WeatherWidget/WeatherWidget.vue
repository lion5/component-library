<template>
  <WidgetWrapper class="weather-widget" :busy="busy" :error="error">
    <WidgetHeadline
      headline="Wetter"
      :subheading="`für ${location.locationName}`"
    />
    <div class="weather" v-if="weatherData">
      <WeatherIcon :icon-key="weatherData.weather.icon" />
      <span class="temperature">
        {{ getFormattedTemperature(weatherData.weather.temperature) }}
      </span>
      <div class="additional-info">
        <span>Niederschlag</span>
        <span>{{ weatherData.weather.precipitation_10 }}mm</span>
        <span>Luftfeuchte</span>
        <span>{{ weatherData.weather.relative_humidity }}%</span>
        <span>Wind</span>
        <span>
          {{ getFormattedNumber(weatherData.weather.wind_speed_10) }}&nbsp;km/h
        </span>
        <span>Windrichtung</span>
        <WindDirection :degree="weatherData.weather.wind_direction_10" />
        <span>Messzeit</span>
        <span class="time">
          {{ getFormattedTime(weatherData.weather.timestamp) }}
        </span>
      </div>
    </div>
    <BrightSkySources v-if="weatherData" :sources="weatherData.sources" />
  </WidgetWrapper>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import {
  NamedLocation,
  useDate,
  useInterval,
  useNumber
} from '@lion5/component-library'
import { WeatherSetting } from '@/components/widgets/weather/widgets/WeatherWidget/settings'
import { useBrightSkyWeatherIcon } from '@/components/widgets/weather/composables/useBrightSkyWeatherIcon'
import { useBrightSkyWeather } from '@/components/widgets/weather/composables/useBrightSkyWeather'
import WidgetWrapper from '@/components/WidgetWrapper/WidgetWrapper.vue'
import WidgetHeadline from '@/components/WidgetHeadline/WidgetHeadline.vue'
import WeatherIcon from '@/components/widgets/weather/components/WeatherIcon.vue'
import WindDirection from '@/components/widgets/weather/components/WindDirection.vue'
import BrightSkySources from '@/components/widgets/weather/components/BrightSkySources.vue'
import { WidgetSettings } from '@/models/widgetConfiguration'
import { useWidget } from '@/composables/useWidget'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const location = getReactiveSetting(
  WeatherSetting.LOCATION
) as ComputedRef<NamedLocation>

const { getFormattedTime } = useDate()
const { getFormattedNumber } = useNumber()
const { getFormattedTemperature } = useBrightSkyWeatherIcon()
const { fetchCurrentWeather, weatherData, busy, error } = useBrightSkyWeather()
const { createIntervalSeconds, removeInterval } = useInterval()

onMounted(async () => {
  await fetchCurrentWeather(location.value.location)
  createIntervalSeconds(
    () => fetchCurrentWeather(location.value.location),
    6000 // each 10min
  )
})
onUnmounted(() => removeInterval())
</script>

<style lang="scss" scoped>
.weather-widget {
  padding: var(--space-sm) var(--space-md);

  .weather {
    display: flex;
    place-items: center;
    flex-wrap: wrap;
    gap: var(--space-lg) var(--space-md);
    justify-content: center;
    line-height: 1;
  }

  .additional-info {
    display: grid;
    grid-template-columns: auto auto;
    gap: var(--space-xs) var(--space-sm);
    font-size: var(--font-size-body);
  }

  .weather-icon {
    font-size: var(--font-size-8);
  }

  .temperature {
    font-size: var(--font-size-8);
  }
}
</style>
