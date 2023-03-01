<template>
  <MapSingleMarker
    :id="id"
    :marker="marker"
    :zoom="zoom"
    :center="center"
  />
</template>

<script lang="ts" setup>
import {GeoPosition} from '@/base/models/latlng'
import {computed, ref, watch} from 'vue'
import {LatLng, Marker} from 'leaflet'
import MapSingleMarker from '@/base/components/maps/MapSingleMarker/MapSingleMarker.vue'
import {useConfigurationStore} from '@/configuration/store/configuration'
import {useLeafletMarker} from '@/base/composables/useLeafletMarker'

const props = defineProps<{
  id: string,
  value: GeoPosition,
}>()

const emit = defineEmits<{
  (e: 'input', value: GeoPosition): void
}>()

const marker = ref<Marker | undefined>()
defineExpose({marker})

const configStore = useConfigurationStore()
const center = ref<LatLng>(configStore.tenant.city.geolocation.toLatLng())
const zoom = ref<number>(12)

const geolocation = computed({
  get() {
    return props.value
  },
  set(newGeolocation: GeoPosition) {
    emit('input', newGeolocation)
  }
})

const createMarker = (position: GeoPosition) => {
  if (position == null || position.isEmpty()) {
    return
  }

  // Move map to new marker position
  center.value = position.toLatLng()
  // Zoom map to the new marker position
  zoom.value = 18
  const {createDraggableMarker} = useLeafletMarker()
  return createDraggableMarker(
    position.toLatLng(),
    (e) => {
      const latLng: LatLng = e.target._latlng
      const position = new GeoPosition(latLng.lat, latLng.lng)
      emit('input', position)
    }
  )
}

watch(geolocation, (newGeolocation: GeoPosition) => {
  if (geolocation.value.isEmpty()) return

  marker.value = createMarker(newGeolocation)
}, {
  immediate: true
})
</script>
