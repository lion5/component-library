import { portalImage, portalImageApiData } from '../__test__/testData'
import { PortalImage } from '@/base/models/image'
import { imageMixin } from '@/base/mixins/imageMixin'
import { ImageSizes } from '@/base/models/imageSizes'
import { describe, expect, it, vi } from 'vitest'

describe('Model PortalImage', () => {
  it('should load API data correctly', () => {
    expect(PortalImage.fromApi(portalImageApiData)).toStrictEqual(portalImage)
  })

  it('should load File data correctly', async () => {
    const dataUrl = 'dataUrl'
    const image = new Image()
    const getDataUrlFromFileMock = vi.spyOn(imageMixin.methods, 'getDataUrlFromFile').mockResolvedValue(dataUrl)
    const getImageMock = vi.spyOn(PortalImage, 'getImage').mockResolvedValue(image)

    const file = new File([''], 'test', {
      type: 'image/jpg',
      lastModified: new Date()
    })

    const portalImage = await PortalImage.fromFile(file)

    expect(getDataUrlFromFileMock).toHaveBeenCalledWith(file)
    expect(getImageMock).toHaveBeenCalledWith(dataUrl)
    expect(portalImage).toStrictEqual(new PortalImage(-1, 'Lokales Bild', file, image, new ImageSizes(dataUrl)))
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
