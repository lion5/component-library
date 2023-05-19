import { Circle, LatLng, Marker } from 'leaflet'
import type { GeoJsonConvertible } from '@/shapes/models/geoJsonConvertibleType'

export function useGeoJSON() {
  const getGeoJson = (layer: GeoJsonConvertible): any => {
    const geoJSON = layer.toGeoJSON()
    if (layer instanceof Circle) {
      geoJSON.properties.radius = layer.getRadius()
    }
    return geoJSON
  }

  const fixCircleMarkerCollision = (feature: any, latlng: LatLng) => {
    if (feature.properties.radius) {
      return new Circle(latlng, feature.properties.radius)
    } else {
      return new Marker(latlng)
    }
  }

  return {
    getGeoJson,
    fixCircleMarkerCollision,
  }
}
