import { portalImage, portalImageApiData } from './__test__/testData'
import { describe, expect, it, vi } from 'vitest'
import { PortalImage } from '@core/components/image/models/image'
import { ImageSizes } from '@core/components/image/models/imageSizes'
import * as useImageUtilsExports from '@core/composables/useImageUtils'
import { flushPromises } from '@vue/test-utils'

describe('Model PortalImage', () => {
  it('should load API data correctly', () => {
    expect(PortalImage.fromApi(portalImageApiData)).toStrictEqual(portalImage)
  })

  it('should load File data correctly', async () => {
    const dataUrl = 'dataUrl'
    const image = new Image()
    vi.spyOn(useImageUtilsExports, 'useImageUtils').mockReturnValue({
      getDataUrlFromFile: vi.fn().mockResolvedValue(dataUrl)
    })
    const getImageMock = vi
      .spyOn(PortalImage, 'getImage')
      .mockResolvedValue(image)

    const file = new File([''], 'test', {
      type: 'image/jpg',
      lastModified: new Date()
    })

    const portalImage = await PortalImage.fromFile(file)

    expect(
      useImageUtilsExports.useImageUtils().getDataUrlFromFile
    ).toHaveBeenCalledWith(file)
    expect(getImageMock).toHaveBeenCalledWith(dataUrl)
    expect(portalImage).toStrictEqual(
      new PortalImage(-1, 'Lokales Bild', file, image, new ImageSizes(dataUrl))
    )
  })

  it('should clone data correctly', () => {
    const clone = portalImage.clone()
    expect(clone).not.toBe(portalImage)
    expect(clone).toStrictEqual(portalImage)
  })

  it('hasErrors - should return false when errors are empty list', () => {
    const actualPortalImage = portalImage.clone()
    actualPortalImage.errors = []

    expect(actualPortalImage.hasErrors()).toBeFalsy()
  })
  it('hasErrors - should return true when errors list is filled', () => {
    const actualPortalImage = portalImage.clone()
    actualPortalImage.errors = [new Error('Test Error')]

    expect(actualPortalImage.hasErrors()).toBeTruthy()
  })
})
