// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { GeoJSON } from 'leaflet'
import { Circle, LatLng, Marker } from 'leaflet'
import { GeoJsonConvertible } from '@/models/geoJsonConvertibleType'

/**
 * Helper function for leaflet geojson
 */
export function useGeoJSON() {
  const getGeoJson = (
    layer: GeoJsonConvertible
  ): GeoJSON.Feature | GeoJSON.FeatureCollection => {
    const geoJSON = layer.toGeoJSON()
    if (layer instanceof Circle) {
      geoJSON.properties.radius = layer.getRadius()
    }
    return geoJSON
  }

  /**
   * Geojson has no definition of a circle object. Therefore, leaflet converts circles to point.
   * To convert the point back to circle we need to return a circle inside pointToLayer function if radius is set.
   * @param feature a geojson point feature
   * @param latlng the leaflets LatLng object that defines location of the geojson point
   *
   * Returns a circle instead of a marker if a radius is set in properties
   */
  const fixCircleMarkerCollision = (
    feature: GeoJSON.Feature,
    latlng: LatLng
  ) => {
    if (feature.properties?.radius) {
      return new Circle(latlng, feature.properties.radius)
    } else {
      return new Marker(latlng)
    }
  }

  return {
    getGeoJson,
    fixCircleMarkerCollision
  }
}
