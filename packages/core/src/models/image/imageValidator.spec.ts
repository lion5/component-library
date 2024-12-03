import { beforeEach, describe, expect, it } from 'vitest'
import { ImageForm } from '@core/models/image/imageForm'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { ImageValidator } from '@core/models/image/imageValidator'

describe('imageValidator.ts', () => {
  let image: ImageForm

  beforeEach(() => {
    image = new ImageForm(1, '', new File(['Hello World.'], 'testFile.txt', { type: 'text/plain' }), new Image(1200, 900))
  })

  it('should throw error when file not exists', () => {
    const actualImage = new ImageForm(1, '', undefined, new Image())
    const imageConstraints = new ImageConstraints()

    const testFunction = () => {
      ImageValidator.validate(actualImage, imageConstraints)
    }
    expect(testFunction).toThrow(Error)
    expect(testFunction).toThrow('Remote images cannot be validated at the moment.')
  })
  it('should throw error when image not exists', () => {
    const actualImage = new ImageForm(1, '', new File([''], 'testFile'), undefined)
    const imageConstraints = new ImageConstraints()

    const testFunction = () => {
      ImageValidator.validate(actualImage, imageConstraints)
    }
    expect(testFunction).toThrow(Error)
    expect(testFunction).toThrow('Remote images cannot be validated at the moment.')
  })
  it('should return errors when image has the wrong mime type', () => {
    const imageConstraints = new ImageConstraints(['image/jpeg', 'image/webp'])

    const errors = ImageValidator.validate(image, imageConstraints)

    expect(errors).toStrictEqual([new Error('Die Datei beinhaltet einen falschen Dateityp (text/plain). Zugelassen sind nur die folgenden Dateitypen image/jpeg, image/webp.')])
  })
  it('should return errors when image has the wrong sizeInBytes', () => {
    const imageConstraints = new ImageConstraints(undefined, undefined, undefined, undefined, 0)

    const errors = ImageValidator.validate(image, imageConstraints)

    expect(errors).toStrictEqual([new Error('Die maximale Dateigröße beträgt 0,00\u00A0B. Die Dateigröße des Bildes beträgt 12,00\u00A0B.')])
  })
  it('should return errors when image has the wrong width', () => {
    const imageConstraints = new ImageConstraints(undefined, undefined, 500)

    const errors = ImageValidator.validate(image, imageConstraints)

    expect(errors).toStrictEqual([new Error('Die Breite des eingegebenen Bildes misst 1200 px. Die akzeptierte Breite ist 500 px.')])
  })
  it('should return errors when image has the wrong height', () => {
    const imageConstraints = new ImageConstraints(undefined, undefined, undefined, 600)

    const errors = ImageValidator.validate(image, imageConstraints)

    expect(errors).toStrictEqual([new Error('Die Höhe des eingegebenen Bildes misst 900 px. Die akzeptierte Höhe ist 600 px.')])
  })
  it('should return multiple errors when image has multiple conflicts', () => {
    const imageConstraints = new ImageConstraints(['image/png'], undefined, 100, 100, 1)

    const errors = ImageValidator.validate(image, imageConstraints)

    expect(errors).toStrictEqual([
      new Error('Die Datei beinhaltet einen falschen Dateityp (text/plain). Zugelassen sind nur die folgenden Dateitypen image/png.'),
      new Error('Die maximale Dateigröße beträgt 1,00\u00A0B. Die Dateigröße des Bildes beträgt 12,00\u00A0B.'),
      new Error('Die Breite des eingegebenen Bildes misst 1200 px. Die akzeptierte Breite ist 100 px.'),
      new Error('Die Höhe des eingegebenen Bildes misst 900 px. Die akzeptierte Höhe ist 100 px.')
    ])
  })
})
