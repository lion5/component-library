import { GpsLocation } from '@core/models/gpsLocation'

export class NamedLocation {
  readonly location: GpsLocation
  readonly locationName: string

  constructor(location: GpsLocation, locationName: string) {
    this.location = location
    this.locationName = locationName
  }
}
