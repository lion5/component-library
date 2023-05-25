import { describe, expect, it, vi } from 'vitest'
import { usePolygon } from '@/dashboard/widgets/weather/composables/usePolygon'
import booleanPointInPolygon from '@turf/boolean-point-in-polygon'
import { GpsLocation } from '@/models/location/gpsLocation'

vi.mock('@turf/boolean-point-in-polygon', () => ({
  default: vi.fn(),
}))

describe('usePolygon.ts', () => {
  it('isPointInPolygon - returns true if booleanPointInPolygon returns true', () => {
    const expectedPoint = {
      type: 'Feature',
      properties: {},
      geometry: {
        type: 'Point',
        // Note order: longitude, latitude.
        coordinates: [12.34, 49.12],
      },
    }
    const expectedPolygon = {
      type: 'Feature',
      properties: {},
      geometry: {
        coordinates: [
          [
            [12.34, 49.12],
            [10.12, 51.13],
          ],
        ],
        type: 'Polygon',
      },
    }

    // @ts-ignore
    booleanPointInPolygon.mockReturnValue(true)
    const { isPointInPolygon } = usePolygon()
    const location = new GpsLocation(49.12, 12.34)
    const dwdRegion = [49.12, 12.34, 51.13, 10.12]

    expect(isPointInPolygon(location, dwdRegion)).toBeTruthy()
    expect(booleanPointInPolygon).toHaveBeenCalledWith(
      expectedPoint,
      expectedPolygon
    )
  })
})
