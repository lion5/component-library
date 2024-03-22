import { ref } from 'vue'
import { GpsLocation, useFetchState } from '@lion5/component-library'
import { WeatherWarning } from '@gridstack/components/widgets/weather/models/weatherWarning'
import { usePolygon } from '@gridstack/components/widgets/weather/composables/usePolygon'

export function useDWDWeatherWarnings() {
  const locationBasedWarnings = ref<WeatherWarning[]>()
  const { busy, error, setBusy, setIdle, setError, clearError } =
    useFetchState()

  const isLocationWarning = (
    location: GpsLocation,
    weatherWarnItem: WeatherWarning
  ) => {
    const { isPointInPolygon } = usePolygon()
    const matchingRegions = weatherWarnItem.regions.filter((region) =>
      isPointInPolygon(location, region.polygon)
    )
    return matchingRegions.length > 0
  }
  const fetchWeatherWarning = async (location: GpsLocation) => {
    clearError()
    setBusy()
    try {
      const url =
        'https://s3.eu-central-1.amazonaws.com/app-prod-static.warnwetter.de/v16/gemeinde_warnings_v2.json'
      const response = await fetch(url)
      const jsonResponse = await response.json()
      const warnings: WeatherWarning[] = jsonResponse.warnings
      locationBasedWarnings.value = warnings.filter((weatherWarnItem) =>
        isLocationWarning(location, weatherWarnItem)
      )
    } catch (e) {
      setError(
        new Error(
          'Die Wetterwarnungen konnten leider nicht geladen werden. Bitte wenden Sie sich an den Support.'
        )
      )
    } finally {
      setIdle()
    }
  }

  return { fetchWeatherWarning, warnings: locationBasedWarnings, busy, error }
}
