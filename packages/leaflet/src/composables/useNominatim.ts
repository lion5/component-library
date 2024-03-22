import { uniqBy } from 'lodash'
import { NominatimResult } from '@leaflet/models'
import { NamedLocation } from '@leaflet/models'
import { GpsLocation } from '@leaflet/models'

/**
 * Defines function to resolve location names to coordinates
 */
export function useNominatim() {
  const _getUrl = (locationName: string) => {
    // See https://nominatim.org/release-docs/latest/api/Search/ for documentation
    const url = new URL('https://nominatim.openstreetmap.org/search')
    url.searchParams.set('q', locationName)
    url.searchParams.set('format', 'jsonv2') // See https://nominatim.org/release-docs/latest/api/Output/ for available formats
    url.searchParams.set('accept-language', 'de-DE')
    url.searchParams.set('countrycodes', 'de')
    url.searchParams.set('dedupe', '1')
    return url.toString()
  }

  /**
   * Search for gps coordinates that match the locationName
   *
   * @param locationName the location name that is used to search for the location
   * @return a list of found locations matching the locationName
   */
  const getLocations = async (locationName: string) => {
    const url = _getUrl(locationName)
    const response = await fetch(url)
    const json = await response.json()
    const namedLocations = json.map(
      (jsonElement: NominatimResult) =>
        new NamedLocation(
          new GpsLocation(jsonElement.lat, jsonElement.lon),
          jsonElement.display_name
        )
    )
    return uniqBy(
      namedLocations,
      (namedLocation: NamedLocation) => namedLocation.locationName
    )
  }
  return { getLocations }
}
