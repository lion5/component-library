import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useBrightSkyWeather } from './useBrightSkyWeather'

describe('useBrightSkyWeather.ts', () => {
  beforeEach(() => {
    globalThis.fetch = vi.fn() as typeof fetch
  })
  it('fetchCurrentWeather - calls api with correct url', async () => {
    const location = { latitude: 47.32, longitude: 12.34 }
    const expectedUrl = `https://api.brightsky.dev/current_weather?tz=Europe%2FBerlin&lat=47.32&lon=12.34&max_dist=20000&units=dwd`

    const { fetchCurrentWeather } = useBrightSkyWeather()
    await fetchCurrentWeather(location)

    expect(globalThis.fetch).toHaveBeenCalledWith(expectedUrl)
  })
  it('fetchCurrentWeather - set error if fetch fails', async () => {
    const location = { latitude: 47.32, longitude: 12.34 }
    vi.mocked(globalThis.fetch).mockRejectedValue(new Error())
    const { fetchCurrentWeather, error } = useBrightSkyWeather()
    await fetchCurrentWeather(location)

    expect(error.value).toStrictEqual(
      new Error('Wetterdaten konnten nicht abegrufen werden.')
    )
  })
})
