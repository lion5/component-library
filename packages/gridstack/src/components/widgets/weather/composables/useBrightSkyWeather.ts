import { ref } from 'vue'
import { BrightSkyCurrentWeather } from '@/components/widgets/weather/models/brightSkyCurrentWeather'
import { useFetchState } from '@lion5/component-library'

type GpsLocation = {
  latitude: number
  longitude: number
}
export function useBrightSkyWeather() {
  const weatherData = ref<BrightSkyCurrentWeather | undefined>()
  const { busy, error, setBusy, setIdle, setError, clearError } =
    useFetchState()
  const _getUrl = (location: GpsLocation) => {
    const maxSearchDistanceInM = 20_000 // in meters

    // See https://brightsky.dev/docs/#get-/weather
    const url = new URL('https://api.brightsky.dev/current_weather')
    url.searchParams.set('tz', 'Europe/Berlin')
    url.searchParams.set('lat', location.latitude.toString())
    url.searchParams.set('lon', location.longitude.toString())
    url.searchParams.set('max_dist', maxSearchDistanceInM.toString())
    url.searchParams.set('units', 'dwd')
    return url.toString()
  }

  const fetchCurrentWeather = async (location: GpsLocation) => {
    clearError()
    setBusy()
    try {
      const response = await fetch(_getUrl(location))
      weatherData.value = await response.json()
      return weatherData.value as BrightSkyCurrentWeather
    } catch {
      setError(new Error('Wetterdaten konnten nicht abegrufen werden.'))
    } finally {
      setIdle()
    }
  }

  return { fetchCurrentWeather, weatherData, busy, error }
}
