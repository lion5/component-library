<template>
  <WidgetWrapper class="weather-forecast-widget" :busy="busy" :error="error">
    <WidgetHeadline
      headline="Wettervorhersage"
      :subheading="`für ${location.locationName}`"
    />
    <section v-if="weatherData24h">
      <h3>24-Stunden Vorhersage</h3>
      <HourlyForecast :forecasts="weatherData24h" />
    </section>
    <section v-if="weatherDataByDay">
      <h3>7-Tage Vorhersage</h3>
      <SevenDayForecast :forecasts="weatherDataByDay" />
    </section>
    <BrightSkySources v-if="weatherData" :sources="weatherData.sources" />
  </WidgetWrapper>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useWidget, WidgetSettings } from '@/atoms'
import { WeatherForecastSetting } from '@/atoms/dashboard/widgets/weather/widgets/WeatherForcastWidget/settings'
import { NamedLocation } from '@/models/namedLocation'
import { useBrightSkyWeatherForecast } from '@/atoms/dashboard/widgets/weather/composables/useBrightSkyWeatherForecast'
import { useInterval } from '@/composables'
import WidgetWrapper from '@/atoms/dashboard/WidgetWrapper/WidgetWrapper.vue'
import WidgetHeadline from '@/atoms/dashboard/WidgetHeadline/WidgetHeadline.vue'
import HourlyForecast from '@/atoms/dashboard/widgets/weather/components/HourlyForecast.vue'
import SevenDayForecast from '@/atoms/dashboard/widgets/weather/components/SevenDayForecast.vue'
import BrightSkySources from '@/atoms/dashboard/widgets/weather/components/BrightSkySources.vue'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const location = getReactiveSetting(
  WeatherForecastSetting.LOCATION
) as ComputedRef<NamedLocation>

const {
  fetchForecasts,
  weatherData24h,
  weatherDataByDay,
  weatherData,
  busy,
  error
} = useBrightSkyWeatherForecast()
const { createIntervalSeconds, removeInterval } = useInterval()

onMounted(async () => {
  await fetchForecasts(location.value.location)
  createIntervalSeconds(() => fetchForecasts(location.value.location), 3600) // each hour
})
onUnmounted(() => removeInterval())
</script>

<style lang="scss" scoped>
.weather-forecast-widget {
  display: flex;
  flex-direction: column;
  gap: var(--space-mdv);
  padding: var(--space-sm) var(--space-md);
}
</style>
