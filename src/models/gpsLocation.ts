import { LatLng } from 'leaflet'

export class GpsLocation {
  readonly latitude: number
  readonly longitude: number

  constructor(latitude: number, longitude: number) {
    this.latitude = latitude
    this.longitude = longitude
  }

  public toLatLng() {
    return new LatLng(this.latitude, this.longitude)
  }

  public toString(): string {
    return `${this.latitude}, ${this.longitude}`
  }

  public toApi(): ApiGpsLocation {
    return {
      latitude: this.latitude,
      longitude: this.longitude
    }
  }

  public equals(other: GpsLocation): boolean {
    return (
      this === other ||
      (this.latitude === other.latitude && this.longitude === other.longitude)
    )
  }

  public static fromApi(data: ApiGpsLocation) {
    return new GpsLocation(data.latitude, data.longitude)
  }

  public static fromGeolocationPosition(position: GeolocationPosition) {
    return new GpsLocation(position.coords.latitude, position.coords.longitude)
  }

  public static fromLatLng(latLng: LatLng) {
    return new GpsLocation(latLng.lat, latLng.lng)
  }
}

export interface ApiGpsLocation {
  latitude: number
  longitude: number
}
