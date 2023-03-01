<template>
  <div
    v-if="id"
    :id="id"
    class="map"
  />
</template>

<script lang="ts" setup>
import {computed, onMounted} from 'vue'
import {LatLng, Map} from 'leaflet'
import {useLeafletMap} from '@/base/composables/useLeafletMap'

const props = withDefaults(
  defineProps<{
    id: string,
    zoom: number,
    center: LatLng
  }>(),
  {
    zoom: 12,
  }
)

const emit = defineEmits<{
  (e: 'map-created', value: Map): void
}>()

const localZoom = computed(() => props.zoom)
const localCenter = computed(() => props.center)

const {map, initMap} = useLeafletMap(localZoom, localCenter)
defineExpose({map})

onMounted(async () => {
  initMap(
    props.id,
    props.zoom,
    props.center
  )
  if (!map.value) return
  emit('map-created', map.value)
})
</script>
<style lang="scss" scoped>
.map {
  height: min(400px, 60vw);
}
</style>
