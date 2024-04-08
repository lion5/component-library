<template>
  <span class="weather-icon">
    <component :is="getWeatherIcon(iconKey)"></component>
  </span>
</template>
<script lang="ts" setup>
import { useBrightSkyWeatherIcon } from '@/components/widgets/weather/composables/useBrightSkyWeatherIcon'

defineProps<{
  iconKey: string | null
}>()

const { getWeatherIcon } = useBrightSkyWeatherIcon()
</script>
