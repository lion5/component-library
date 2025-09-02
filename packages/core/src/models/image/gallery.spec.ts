import { describe, expect, it } from 'vitest'
import { Gallery } from '@core/models/image/gallery'
import { gallery, galleryAPIData } from '@core/models/image/__test__/testData'

describe('gallery.ts', () => {
  it('fromApi - should load API data correctly', function () {
    expect(Gallery.fromApi(galleryAPIData)).toStrictEqual(gallery)
  })

  it('isEmpty - should return true when images are empty', function () {
    const gallery = new Gallery([])

    expect(gallery.isEmpty()).toBeTruthy()
  })
})
