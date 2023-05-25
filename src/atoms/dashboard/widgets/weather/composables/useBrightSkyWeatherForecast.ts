import { computed, ref } from 'vue'
import { groupBy } from 'lodash'
import { useFetchState } from '@/composables'
import { GpsLocation } from '@/models/gpsLocation'
import {
  BrightSkyForecastWeather,
  BrightSkyForecastWeatherItem
} from '@/atoms/dashboard/widgets/weather/models/brightSkyForecastWeather'
import { AggregatedWeather } from '@/atoms/dashboard/widgets/weather/models/aggregatedWeather'

export function useBrightSkyWeatherForecast() {
  const { busy, error, setBusy, setIdle, setError, clearError } =
    useFetchState()
  const _getUrl = (location: GpsLocation) => {
    const maxSearchDistanceInM = 20000 // in meters
    const durationInDays = 7

    const fromDay = new Date()
    const toDay = new Date()
    toDay.setDate(fromDay.getDate() + durationInDays)

    // See https://brightsky.dev/docs/#get-/weather
    const url = new URL('https://api.brightsky.dev/weather')
    url.searchParams.set('tz', 'Europe/Berlin')
    url.searchParams.set('date', new Date().toISOString())
    url.searchParams.set('last_date', toDay.toISOString())
    url.searchParams.set('lat', location.latitude.toString())
    url.searchParams.set('lon', location.longitude.toString())
    url.searchParams.set('max_dist', maxSearchDistanceInM.toString())
    url.searchParams.set('units', 'dwd')
    return url.toString()
  }

  const _getForecastsGroupedByDay = (
    forecasts: BrightSkyForecastWeatherItem[]
  ): AggregatedWeather[] => {
    const weatherGroupedByDay = groupBy(
      forecasts,
      (forecast: BrightSkyForecastWeatherItem) => {
        const date = new Date(forecast.timestamp)
        date.setUTCHours(0, 0, 0, 0)

        return date.toISOString()
      }
    )
    // convert groups to aggregated weather objects
    return Object.entries(weatherGroupedByDay).map(([date, weatherEntries]) =>
      AggregatedWeather.fromBrightSkyData(new Date(date), weatherEntries)
    )
  }

  const get24hForecasts = (
    forecasts: BrightSkyForecastWeatherItem[]
  ): BrightSkyForecastWeatherItem[] => {
    const today = new Date()
    const todayPlus24H = new Date()
    todayPlus24H.setHours(today.getHours() + 24)
    return forecasts.filter(
      (forecast) => new Date(forecast.timestamp) < todayPlus24H
    )
  }

  const weatherData = ref<BrightSkyForecastWeather>()
  const weatherDataByDay = computed(() => {
    if (!weatherData.value) return
    return _getForecastsGroupedByDay(weatherData.value?.weather)
  })
  const weatherData24h = computed(() => {
    if (!weatherData.value) return
    return get24hForecasts(weatherData.value?.weather)
  })
  const fetchForecasts = async (location: GpsLocation) => {
    clearError()
    setBusy()
    try {
      const response = await fetch(_getUrl(location))
      weatherData.value = await response.json()
      return weatherData.value as BrightSkyForecastWeather
    } catch (error) {
      setError(new Error('Wetterdaten konnten nicht abegrufen werden.'))
    } finally {
      setIdle()
    }
  }

  return {
    fetchForecasts,
    weatherDataByDay,
    weatherData24h,
    weatherData,
    busy,
    error
  }
}
