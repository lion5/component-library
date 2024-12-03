import { describe, expect, it } from 'vitest'
import { ImageResponse } from '@core/models/image/imageResponse'
import { fakeImageResponse, fakeImageResponseApi } from '@core/models/image/__test__/testData'

describe('imageResponse.ts', () => {
  it('fromApi - should load API data correctly', () => {
    expect(ImageResponse.fromApi(fakeImageResponseApi)).toStrictEqual(fakeImageResponse)
  })
})
