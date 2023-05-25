import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { GpsLocation } from '@/models/gpsLocation'

export function usePolygon() {
  type Feature = 'Feature'
  type Point = 'Point'
  type Polygon = 'Polygon'
  const getGeoJsonCoordinatesFromDWDRegion = (dwdRegion: number[]) => {
    const dwdRegionCopy = Array.of(...dwdRegion)
    const polygon: number[][] = []
    while (dwdRegionCopy.length > 0) {
      const latitude = dwdRegionCopy.shift()
      const longitude = dwdRegionCopy.shift()
      if (!latitude || !longitude) {
        break
      }
      polygon.push([longitude, latitude])
    }
    return polygon
  }

  const geoJsonPointFromGpsLocation = (location: GpsLocation) => {
    return {
      type: 'Feature' as Feature,
      properties: {},
      geometry: {
        type: 'Point' as Point,
        // Note order: longitude, latitude.
        coordinates: [location.longitude, location.latitude]
      }
    }
  }
  const geoJsonPolygonFromDWDRegion = (dwdRegion: any) => {
    type Feature = 'Feature'
    return {
      type: 'Feature' as Feature,
      properties: {},
      geometry: {
        coordinates: [getGeoJsonCoordinatesFromDWDRegion(dwdRegion)],
        type: 'Polygon' as Polygon
      }
    }
  }

  const isPointInPolygon = (location: GpsLocation, dwdRegion: any) => {
    const point = geoJsonPointFromGpsLocation(location)
    const polygon = geoJsonPolygonFromDWDRegion(dwdRegion)

    return booleanPointInPolygon(point, polygon)
  }

  return { isPointInPolygon }
}
