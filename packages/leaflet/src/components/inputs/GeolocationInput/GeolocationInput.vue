<template>
  <LeafletMap
    class="map"
    :id="name + '-map'"
    :initial-zoom="zoom"
    :initial-center="center"
    @map-created="onMapCreated"
  />
  <label :for="name" hidden>Ort</label>
  <input type="hidden" :name="name" :id="name" v-model="location" />
  <span v-if="errorMessage" class="error">{{ errorMessage }}</span>
</template>

<script lang="ts" setup>
import LeafletMap from '@leaflet/components/LeafletMap/LeafletMap.vue'
import { useLeafletMarker } from '@leaflet/composables/useLeafletMarker'
import { computed, ref, watch } from 'vue'
import { useField } from 'vee-validate'
import { GpsLocation } from '@leaflet/models'
import {
  DragEndEvent,
  LatLng,
  Marker,
  type Map as LeafletMapType
} from 'leaflet'

const props = withDefaults(
  defineProps<{
    name: string
    modelValue?: GpsLocation
    markerIconUrl?: string
    markerPopupTitle?: string
    markerPopupContent?: string
    zoom?: number
  }>(),
  {
    zoom: 16
  }
)

const marker = ref<Marker | undefined>()
const center = computed(
  () => props.modelValue?.toLatLng() || new LatLng(49.8857, 10.8936)
)
defineExpose({ marker })

const onMapCreated = async (map: LeafletMapType) => {
  const { drawDraggableMarker } = useLeafletMarker()
  marker.value = drawDraggableMarker(
    map,
    center.value,
    props.markerIconUrl,
    props.markerPopupTitle || 'Ausgewählter Ort',
    props.markerPopupContent || 'Marker bewegen, um Ort zu ändern',
    onMarkerDragged
  )
}

const {
  value: location,
  errorMessage,
  setValue
} = useField<GpsLocation>(props.name, undefined, {
  syncVModel: true
})

const onMarkerDragged = (e: DragEndEvent) => {
  if (!marker.value) {
    return
  }
  const latLng = e.target.getLatLng()
  const location = GpsLocation.fromLatLng(latLng)
  setValue(location)
}

watch(
  () => props.modelValue,
  (location: GpsLocation | undefined) => {
    if (!marker.value || !location) {
      return
    }
    marker.value?.setLatLng(location.toLatLng())
  }
)

watch(
  () => props.markerIconUrl,
  (url: string | undefined) => {
    if (!url) {
      return
    }
    const { getMarkerIcon } = useLeafletMarker()
    marker.value?.setIcon(getMarkerIcon(url))
  }
)
</script>
<style lang="scss" scoped>
.map {
  height: 170px;
  width: 100%;
}

.error {
  color: var(--color-danger);
  font-size: var(--font-size-0);
}
</style>
