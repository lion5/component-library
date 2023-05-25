<template>
  <div class="wind-direction">
    <WindDirectionIcon :degree="degree" />
    {{ getDirectionName(degree) }}
  </div>
</template>
<script lang="ts" setup>
import { useWindDirection } from '@/atoms/dashboard/widgets/weather/composables/useWindDirection'
import WindDirectionIcon from '@/atoms/dashboard/widgets/weather/components/WindDirectionIcon.vue'

defineProps<{
  degree: number | null
}>()

const { getDirectionName } = useWindDirection()
</script>
<style scoped>
.wind-direction {
  white-space: nowrap;
}
</style>
