import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useBrightSkyWeatherForecast } from '@/components/widgets/weather/composables/useBrightSkyWeatherForecast'
import { BrightSkyForecastWeather } from '@/components/widgets/weather/models/brightSkyForecastWeather'
import { AggregatedWeather } from '@/components/widgets/weather/models/aggregatedWeather'

describe('useBrightSkyWeatherForecast.ts', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
    vi.useFakeTimers()
    const date = new Date('2023-04-20T13:00:00.000Z')
    vi.setSystemTime(date)
  })
  afterEach(() => {
    vi.useRealTimers()
  })
  it('fetchForecasts - calls api with correct url', async () => {
    const location = { latitude: 47.32, longitude: 12.34 }
    const expectedUrl = `https://api.brightsky.dev/weather?tz=Europe%2FBerlin&date=2023-04-20T13%3A00%3A00.000Z&last_date=2023-04-27T13%3A00%3A00.000Z&lat=47.32&lon=12.34&max_dist=20000&units=dwd`

    const { fetchForecasts } = useBrightSkyWeatherForecast()
    await fetchForecasts(location)

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl)
  })
  it('fetchForecasts - set error if fetch fails', async () => {
    const location = { latitude: 47.32, longitude: 12.34 }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch.mockRejectedValue(new Error())
    const { fetchForecasts, error } = useBrightSkyWeatherForecast()
    await fetchForecasts(location)

    expect(error.value).toStrictEqual(
      new Error('Wetterdaten konnten nicht abegrufen werden.')
    )
  })

  it('weatherData24h - returns only forecasts for the next 24 hours', async () => {
    const { weatherData, weatherData24h } = useBrightSkyWeatherForecast()
    weatherData.value = {
      weather: [
        { timestamp: '2023-04-20T13:00:00.000Z' },
        { timestamp: '2023-04-21T14:00:00.000Z' }
      ]
    } as BrightSkyForecastWeather

    expect(weatherData24h.value).toStrictEqual([weatherData.value?.weather[0]])
  })
  it('weatherDataByDay - returns forecast aggregated per day', async () => {
    const expectedAggregation = new AggregatedWeather(
      new Date('2023-04-20T00:00:00.000Z'),
      'fog',
      10,
      20,
      45,
      30
    )
    const { weatherData, weatherDataByDay } = useBrightSkyWeatherForecast()
    weatherData.value = {
      weather: [
        {
          timestamp: '2023-04-20T13:00:00.000Z',
          temperature: 10,
          wind_direction: 30,
          wind_speed: 45,
          icon: 'fog'
        },
        {
          timestamp: '2023-04-20T14:00:00.000Z',
          temperature: 20,
          wind_direction: 40,
          wind_speed: 23,
          icon: 'fog'
        },
        {
          timestamp: '2023-04-20T16:00:00.000Z',
          temperature: 10,
          wind_direction: 10,
          wind_speed: 10,
          icon: 'rain'
        },
        {
          timestamp: '2023-04-21T14:00:00.000Z',
          temperature: 30,
          wind_direction: 45,
          wind_speed: 50,
          icon: 'rain'
        }
      ]
    } as BrightSkyForecastWeather

    expect(weatherDataByDay.value?.at(0)).toStrictEqual(expectedAggregation)
  })
})
