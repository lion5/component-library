import { gallery, galleryAPIData } from './__test__/testData'
import { describe, expect, it } from 'vitest'
import { Gallery } from '@core/atoms/image/models/gallery'
import { PortalImage } from '@core/atoms/image/models/image'

describe('Model Gallery', () => {
  it('should load API data correctly', function () {
    expect(Gallery.fromApi(galleryAPIData)).toStrictEqual(gallery)
  })

  it('should clone data correctly', function () {
    const clone = gallery.clone()
    expect(clone).not.toBe(gallery)
    for (let i = 0; i < gallery.images.length; i++) {
      expect(clone.images[i]).not.toBe(gallery.images[i])
    }
    expect(clone).toStrictEqual(gallery)
  })

  it('hasErrors - should return false when no image has an error', function () {
    expect(gallery.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return false when only removed image has an error', function () {
    const errorGallery = gallery.clone()
    errorGallery.images[0].errors = [new Error('Test Error')]
    errorGallery.images[0].removed = true

    expect(gallery.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return true when a image has an error', function () {
    const errorGallery = gallery.clone()
    errorGallery.images[0].errors = [new Error('Test Error')]

    expect(errorGallery.hasErrors()).toBeTruthy()
  })

  it('areAllImagesPublished - should return true all images published', function () {
    expect(gallery.areAllImagesPublished()).toBeTruthy()
  })
  it('areAllImagesPublished - should return true when only a removed image is not published', function () {
    const publishedGallery = gallery.clone()
    publishedGallery.images[0].id = -1
    publishedGallery.images[0].removed = true

    expect(gallery.areAllImagesPublished()).toBeTruthy()
  })
  it('areAllImagesPublished - should return false when a image is not published', function () {
    const publishedGallery = gallery.clone()
    publishedGallery.images[0].id = -1

    expect(publishedGallery.areAllImagesPublished()).toBeFalsy()
  })

  it('isEmpty - should return true when images are empty', function () {
    const gallery = new Gallery([])

    expect(gallery.isEmpty()).toBeTruthy()
  })

  it('addImage - should update the images with the new one', function () {
    const portalImage = new PortalImage(4, 'alt4')
    const baseGallery = gallery.clone()

    baseGallery.addImage(portalImage)

    expect(baseGallery.images).toStrictEqual([...gallery.images, portalImage])
  })

  it('getImages - should only return not removed images', function () {
    const actualGallery = gallery.clone()
    actualGallery.images[0].removed = true

    expect(actualGallery.getImages()).toStrictEqual([
      actualGallery.images[1],
      actualGallery.images[2]
    ])
  })

  it('moveImage - moves image to the specified index', function () {
    const actualGallery = gallery.clone()

    actualGallery.moveImage(0, 2)

    expect(actualGallery.images[2]).toStrictEqual(gallery.images[0])
  })
})
