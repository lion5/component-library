import { beforeEach, describe, expect, it, vi } from 'vitest'
import { GpsLocation } from '@lion5/component-library'
import { useBrightSkyWeather } from './useBrightSkyWeather'

describe('useBrightSkyWeather.ts', () => {
  beforeEach(() => {
    global.fetch = vi.fn()
  })
  it('fetchCurrentWeather - calls api with correct url', async () => {
    const location = new GpsLocation(47.32, 12.34)
    const expectedUrl = `https://api.brightsky.dev/current_weather?tz=Europe%2FBerlin&lat=47.32&lon=12.34&max_dist=20000&units=dwd`

    const { fetchCurrentWeather } = useBrightSkyWeather()
    await fetchCurrentWeather(location)

    expect(global.fetch).toHaveBeenCalledWith(expectedUrl)
  })
  it('fetchCurrentWeather - set error if fetch fails', async () => {
    const location = new GpsLocation(47.32, 12.34)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    global.fetch.mockRejectedValue(new Error())
    const { fetchCurrentWeather, error } = useBrightSkyWeather()
    await fetchCurrentWeather(location)

    expect(error.value).toStrictEqual(
      new Error('Wetterdaten konnten nicht abegrufen werden.')
    )
  })
})
