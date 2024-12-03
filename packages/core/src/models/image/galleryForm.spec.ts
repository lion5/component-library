import { describe, expect, it } from 'vitest'
import { gallery, galleryForm } from '@core/models/image/__test__/testData'
import { ImageForm } from '@core/models/image/imageForm'
import { GalleryForm } from '@core/models/image/galleryForm'

describe('galleryForm.ts', () => {
  it('clone - should clone', function () {
    const clone = galleryForm.clone()
    expect(clone).not.toBe(galleryForm)
    for (let i = 0; i < galleryForm.images.length; i++) {
      expect(clone.images[i]).not.toBe(galleryForm.images[i])
    }
    expect(clone).toStrictEqual(galleryForm)
  })

  it('hasErrors - should return false if no image has an error', function () {
    expect(galleryForm.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return false if only removed image has an error', function () {
    const errorGallery = galleryForm.clone()
    errorGallery.images[0].errors = [new Error('Test Error')]
    errorGallery.images[0].removed = true

    expect(galleryForm.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return true if an image has an error', function () {
    const errorGallery = galleryForm.clone()
    errorGallery.images[0].errors = [new Error('Test Error')]

    expect(errorGallery.hasErrors()).toBeTruthy()
  })

  it('areAllImagesPublished - should return true if all images published', function () {
    expect(galleryForm.areAllImagesPublished()).toBeTruthy()
  })
  it('areAllImagesPublished - should return true if only a removed image is not published', function () {
    const publishedGallery = galleryForm.clone()
    publishedGallery.images[0] = new ImageForm()
    publishedGallery.images[0].removed = true

    expect(galleryForm.areAllImagesPublished()).toBeTruthy()
  })
  it('areAllImagesPublished - should return false if a image is not published', function () {
    const publishedGallery = galleryForm.clone()
    publishedGallery.images[0] = new ImageForm()

    expect(publishedGallery.areAllImagesPublished()).toBeFalsy()
  })

  it('isEmpty - should return true if image list is empty', function () {
    const galleryForm = new GalleryForm([])

    expect(galleryForm.isEmpty()).toBeTruthy()
  })

  it('addImage - should update the images with the new one', function () {
    const imageForm = new ImageForm(4, 'alt4')
    const baseGallery = galleryForm.clone()

    baseGallery.addImage(imageForm)

    expect(baseGallery.images).toStrictEqual([...galleryForm.images, imageForm])
  })

  it('getImages - should only return not removed images', function () {
    const actualGallery = galleryForm.clone()
    actualGallery.images[0].removed = true

    expect(actualGallery.getImages()).toStrictEqual([actualGallery.images[1], actualGallery.images[2]])
  })

  it('moveImage - moves image to the specified index', function () {
    const actualGallery = galleryForm.clone()

    actualGallery.moveImage(0, 2)

    expect(actualGallery.images[2]).toStrictEqual(galleryForm.images[0])
  })

  it('fromGallery - imports gallery data', function () {
    expect(GalleryForm.fromGallery(gallery)).toStrictEqual(galleryForm)
  })
})
