<template>
  <div v-if="id" :id="id"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useLeafletMap } from '@leaflet/composables/useLeafletMap'
import type { Map } from 'leaflet'
import { Control, LatLng } from 'leaflet'

const props = withDefaults(
  defineProps<{
    id: string
    initialCenter: LatLng
    initialZoom?: number
    minZoom?: number
    maxZoom?: number
    customControls?: Control[]
    contextMenu?: boolean
    hideControls?: boolean
    osmBaseMap?: boolean
  }>(),
  {
    minZoom: 0,
    maxZoom: 19,
    initialZoom: 14,
    customControls: () => [],
    contextMenu: false,
    hideControls: false,
    osmBaseMap: true
  }
)

const emit = defineEmits<{
  (e: 'map-created', value: Map): void
}>()

const zoom = ref<number>(props.initialZoom)
const center = computed(() => props.initialCenter)
const {
  map,
  initMap,
  hideControls: doHideControls
} = useLeafletMap(
  zoom,
  props.minZoom,
  props.maxZoom,
  center,
  props.customControls,
  props.osmBaseMap,
)
defineExpose({ map }) // for testing

onMounted(async () => {
  initMap(props.id, props.initialZoom, center.value, props.contextMenu)
  if (!map.value) {
    return
  }
  emit('map-created', map.value)
  if (props.hideControls) {
    doHideControls()
  }
})
</script>
<style lang="scss">
.leaflet-container {
  font-family: var(--font-family);
  outline: none; // sometimes a outline was shown when the map is focused
}
</style>
