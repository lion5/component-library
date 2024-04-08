<template>
  <WidgetWrapper :busy="busy" :error="error" class="weather-warn-widget">
    <WidgetHeadline
      headline="Wetterwarnungen"
      :subheading="`für ${location.locationName}`"
    />
    <ul v-if="warnings && warnings.length > 0">
      <li v-for="warning in warnings" :key="warning.warnId">
        <div class="headline">
          <h3>{{ warning.headLine }}</h3>
          <small>
            <span v-if="warning.isVorabInfo">(Vorab)</span>
            {{ getDateTime(warning.start) }} -
            {{ getDateTime(warning.end) }}
          </small>
        </div>
        <div>{{ warning.descriptionText }}</div>
        <strong>{{ warning.instruction }}</strong>
      </li>
    </ul>
    <strong v-else>
      Für den ausgewählten Ort gibt es aktuell keine Warnungen.
    </strong>
  </WidgetWrapper>
</template>

<script lang="ts" setup>
import type { ComputedRef } from 'vue'
import { onMounted, onUnmounted } from 'vue'
import { useDate, useInterval } from '@lion5/component-library'
import { WeatherForecastSetting } from '@/components/widgets/weather/widgets/WeatherForcastWidget/settings'
import { useDWDWeatherWarnings } from '@/components/widgets/weather/composables/useDWDWeatherWarnings'
import WidgetWrapper from '@/components/WidgetWrapper/WidgetWrapper.vue'
import WidgetHeadline from '@/components/WidgetHeadline/WidgetHeadline.vue'
import { WidgetSettings } from '@/models/widgetConfiguration'
import { useWidget } from '@/composables/useWidget'
import { NamedLocation } from '@lion5/component-library'

const props = defineProps<{
  settings: WidgetSettings
  defaultSettings: WidgetSettings
}>()
const { getReactiveSetting } = useWidget(props)
const location = getReactiveSetting(
  WeatherForecastSetting.LOCATION
) as ComputedRef<NamedLocation>

const { getDateTime } = useDate()
const { createIntervalSeconds, removeInterval } = useInterval()
const { warnings, fetchWeatherWarning, busy, error } = useDWDWeatherWarnings()
onMounted(async () => {
  try {
    await fetchWeatherWarning(location.value.location)
    createIntervalSeconds(
      () => fetchWeatherWarning(location.value.location),
      60
    )
  } catch (e) {
    console.error('Cannot load weather warnings', e)
  }
})

onUnmounted(() => removeInterval())
</script>

<style lang="scss" scoped>
.weather-warn-widget {
  padding: var(--space-md) var(--space-sm);
}

ul {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);

  li {
    display: flex;
    flex-direction: column;
    gap: var(--space-sm);
    background-color: var(--color-neutral-200);
    padding: var(--space-md);
    border-radius: var(--border-radius-300);
  }
}
</style>
