<template>
  <div class="weather-sources">
    Quellen:
    <ul>
      <li v-for="source in sources" :key="source.id">
        {{ source.station_name }}
      </li>
    </ul>
  </div>
</template>
<script lang="ts" setup>
import { BrightSkySource } from '@/atoms/dashboard/widgets/weather/models/brightSkyCurrentWeather'

defineProps<{ sources: BrightSkySource[] }>()
</script>
<style lang="scss" scoped>
.weather-sources {
  display: flex;
  gap: var(--space-sm);
  font-size: var(--font-size-0);
}

.weather-sources ul {
  display: flex;
  gap: var(--space-xs);
}
</style>
