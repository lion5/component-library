import type { DragEndEvent, Map, MarkerOptions, PointExpression } from 'leaflet'
import { Icon, LatLng, Marker, Popup } from 'leaflet'
import { toRaw } from 'vue'
import icon from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'
import { LocalResource } from '../models/localResource'

export function useLeafletMarker() {
  const MARKER_SHADOW_URL = 'marker-background.svg'

  const drawMarkerWithPopup = (
    map: Map,
    latLng: LatLng,
    iconUrl?: string | undefined,
    popupTitle?: string | undefined,
    popupBody?: string | undefined,
    markerOptions?: Partial<MarkerOptions>,
    popup?: Popup | undefined
  ): Marker => {
    map = toRaw(map)
    const marker = getMarkerWithPopup(
      latLng,
      iconUrl,
      popupTitle,
      popupBody,
      markerOptions,
      popup
    )
    map.addLayer(marker)
    return marker
  }

  const getMarkerWithPopup = (
    latLng: LatLng,
    iconUrl?: string | undefined,
    popupTitle?: string | undefined,
    popupBody?: string | undefined,
    markerOptions?: Partial<MarkerOptions>,
    popup?: Popup | undefined
  ) => {
    const marker = new Marker(latLng, {
      icon: getMarkerIcon(iconUrl),
      contextmenu: false,
      contextmenuItems: [],
      ...markerOptions
    } as unknown as MarkerOptions)
    if (popupTitle || popupBody) {
      marker.bindPopup(`<b>${popupTitle}</b><br>` + popupBody, {
        keepInView: true
      })
    }
    if (popup) {
      marker.bindPopup(popup)
    }
    return marker
  }

  const drawDraggableMarker = (
    map: Map,
    latLng: LatLng,
    iconUrl?: string,
    popupTitle?: string,
    popupBody?: string,
    onDragend?: (event: DragEndEvent) => void
  ) => {
    const marker = drawMarkerWithPopup(
      map,
      latLng,
      iconUrl,
      popupTitle,
      popupBody,
      {
        draggable: true
      }
    )
    if (onDragend) {
      marker.on('dragend', onDragend)
    }
    return marker
  }

  const removeMarker = (map: Map, marker: Marker) => {
    map.removeLayer(marker)
  }

  const getMarkerIcon = (
    iconUrl?: string,
    popupAnchor: PointExpression = [0, -50],
    iconAnchor: PointExpression = [23, 65],
    iconSize: PointExpression = [46, 46],
    shadowSize: PointExpression = [70, 70],
    shadowAnchor: PointExpression = [35, 70]
  ) => {
    if (!iconUrl) {
      return new Icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
      })
    }
    const shadowUrl = LocalResource.marker(MARKER_SHADOW_URL).path
    return new Icon({
      iconUrl,
      popupAnchor,
      iconSize,
      iconAnchor,
      shadowSize,
      shadowUrl,
      shadowAnchor
    })
  }

  return {
    getMarkerIcon,
    getMarkerWithPopup,
    drawMarkerWithPopup,
    drawDraggableMarker,
    removeMarker
  }
}
