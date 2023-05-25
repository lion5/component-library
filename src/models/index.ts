import { SelectOption } from '@/models/selectOption'
import type { GeoJsonConvertible } from '@/models/geoJsonConvertibleType'
import type { ApiGpsLocation } from '@/models/gpsLocation'
import { GpsLocation } from '@/models/gpsLocation'
import { LocalResource, MarkerResource } from '@/models/localResource'
import { NamedLocation } from '@/models/namedLocation'
import { NominatimResult } from '@/models/nominatimResult'

export {
  SelectOption,
  GpsLocation,
  LocalResource,
  MarkerResource,
  NamedLocation
}

export type { GeoJsonConvertible, NominatimResult, ApiGpsLocation }
