<template>
  <MapBase
    :id="id"
    :zoom="zoom"
    :center="center"
    class="map"
    @map-created="onMapCreated"
  />
</template>

<script lang="ts" setup>
import {LatLng, Map, Marker} from 'leaflet'
import {useLeafletWatchableMarker} from '@/base/composables/useLeafletWatchableSingleMarker'
import MapBase from '@/base/components/maps/MapBase/MapBase.vue'
import {computed} from 'vue'

const props = withDefaults(
  defineProps<{
    id: string,
    marker: Marker,
    zoom: number,
    center: LatLng
  }>(),
  {
    zoom: 12,
  }
)

const onMapCreated = async (map: Map) => {
  const {changeMarker } = useLeafletWatchableMarker(map, computed(() => props.marker))
  changeMarker(props.marker)
}
</script>
<style lang="scss" scoped>
</style>
