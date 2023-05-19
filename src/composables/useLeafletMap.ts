import type { LatLng, MapOptions } from 'leaflet'
import { Control, control, Map, TileLayer } from 'leaflet'
import type { Ref } from 'vue'
import { shallowRef, watch } from 'vue'
import 'leaflet.locatecontrol'
import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css'
import 'leaflet-contextmenu'
import 'leaflet-contextmenu/dist/leaflet.contextmenu.css'

export function useLeafletMap(
  zoom: Ref<number | undefined>,
  minZoom: number,
  maxZoom: number,
  center: Ref<LatLng>
) {
  const map = shallowRef<Map | undefined>() as Ref<Map | undefined>
  const zoomControl = new Control.Zoom({
    position: 'topright',
    zoomInTitle: 'Vergrößern',
    zoomOutTitle: 'Verkleinern',
  })
  const scaleControl = new Control.Scale({
    position: 'topright',
    imperial: false,
  })
  const attributionControl = new Control.Attribution({
    position: 'bottomleft',
  })

  const initMap = (
    elementId: string,
    zoom: number,
    center: LatLng,
    locateControl = false,
    contextMenu = false
  ) => {
    map.value = new Map(elementId, {
      zoomControl: false,
      attributionControl: false,
      measureControl: false,
      contextmenu: contextMenu,
      // tell geoman not to ignore map (opt-in)
      pmIgnore: false,
    } as unknown as MapOptions) as Map
    map.value.setView(center, zoom)

    const baseLayer = new TileLayer(
      'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        maxZoom,
        minZoom,
        attribution:
          '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      }
    )
    map.value.addLayer(baseLayer)
    addCustomControls(map.value, locateControl)
  }

  const addCustomControls = (map: Map, locateControl: boolean) => {
    scaleControl.addTo(map)
    attributionControl.addTo(map)
    zoomControl.addTo(map)

    if (locateControl) {
      // location control (to center the map to the user location and show a marker)
      const locateControl = control.locate({
        position: 'topright',
        showPopup: true,
        strings: {
          title: 'Auf aktuelle Position zentrieren',
          metersUnit: 'Meter',
          popup: 'Aktuelle Position (auf {distance} {unit} genau)',
        },
        onLocationError: (event) => {
          // TODO: maybe use custom component here
          window.alert(
            'Aktuelle Position konnte nicht ermittelt werden. Bitte stellen Sie sicher, dass die Ortung erlaubt ist. Falls Sie diese Option nicht sehen, laden Sie die Anwendung neu.'
          )
          console.error(event)
        },
      })
      locateControl.addTo(map)
      ;(map as MapWithCustomProps).locateControl = locateControl
    }
  }

  const hideControls = () => {
    map.value?.removeControl(scaleControl)
    map.value?.removeControl(zoomControl)
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
