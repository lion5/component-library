import { describe, expect, it, vi } from 'vitest'
import { ImageForm } from '@core/models/image/imageForm'
import { fakeImageForm, fakeImageResponse } from '@core/models/image/__test__/testData'
import * as useImageUtilsExports from '@core/composables/useImageUtils'
import { ImageSizes } from '@core/models/image/imageSizes'

describe('imageForm.ts', () => {
  it('fromImage - should load image response', () => {
    expect(ImageForm.fromImage(fakeImageResponse)).toStrictEqual(fakeImageForm)
  })

  it('fromFile - should load File data correctly', async () => {
    const dataUrl = 'dataUrl'
    const image = new Image()
    const getDataUrlFromFileMock = vi.fn()
    vi.spyOn(useImageUtilsExports, 'useImageUtils').mockReturnValue({
      getDataUrlFromFile: getDataUrlFromFileMock.mockResolvedValue(dataUrl)
    })
    const getImageMock = vi.spyOn(ImageForm, 'getImage').mockResolvedValue(image)

    const file = new File([''], 'test', {
      type: 'image/jpg',
      lastModified: Date.now()
    })

    const portalImage = await ImageForm.fromFile(file)

    expect(getDataUrlFromFileMock).toHaveBeenCalledWith(file)
    expect(getImageMock).toHaveBeenCalledWith(dataUrl)
    expect(portalImage).toStrictEqual(
      new ImageForm(-1, 'Lokales Bild', file, image, new ImageSizes(dataUrl))
    )
  })

  it('clone - should clone data', () => {
    const clone = fakeImageForm.clone()
    expect(clone).not.toBe(fakeImageForm)
    expect(clone).toStrictEqual(fakeImageForm)
  })

  it('hasErrors - should return false when errors are empty list', () => {
    const actualPortalImage = fakeImageForm.clone()
    actualPortalImage.errors = []

    expect(actualPortalImage.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return true when errors list is filled', () => {
    const actualPortalImage = fakeImageForm.clone()
    actualPortalImage.errors = [new Error('Test Error')]

    expect(actualPortalImage.hasErrors()).toBeTruthy()
  })
})
