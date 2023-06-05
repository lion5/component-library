import type { LatLng, MapOptions } from 'leaflet'
import { Control, Map, TileLayer } from 'leaflet'
import type { Ref } from 'vue'
import { shallowRef, watch } from 'vue'

export function useLeafletMap(
  zoom: Ref<number | undefined>,
  minZoom: number,
  maxZoom: number,
  center: Ref<LatLng>,
  controls: Control[]
) {
  const map = shallowRef<Map | undefined>() as Ref<Map | undefined>
  const initMap = (
    elementId: string,
    zoom: number,
    center: LatLng,
    contextMenu = false
  ) => {
    map.value = new Map(elementId, {
      zoomControl: false,
      attributionControl: false,
      measureControl: false,
      contextmenu: contextMenu,
      // tell geoman not to ignore map (opt-in)
      pmIgnore: false
    } as unknown as MapOptions) as Map
    map.value.setView(center, zoom)

    const baseLayer = new TileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom,
        minZoom,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }
    )
    map.value.addLayer(baseLayer)
    addCustomControls(map.value)
  }

  const addCustomControls = (map: Map) => {
    for (const control of controls) {
      control.addTo(map)
    }
  }

  const hideControls = () => {
    if (!map.value) return
    const currentMap = map.value
    for (const control of controls) {
      currentMap?.removeControl(control)
    }
  }

  watch(zoom, (zoom: number | undefined) => {
    if (!map.value || !zoom) {
      return
    }
    map.value.setZoom(zoom)
  })

  watch(center, (center: LatLng | undefined) => {
    if (!map.value || !center) {
      return
    }
    map.value.setView(center)
  })

  return { map, initMap, hideControls }
}
