import { ImageForm } from '@core/models/image/imageForm'
import { ImageConstraints } from '@core/models/image/imageConstraints'
import { useFileUtils } from '@core/composables/useFileUtils'

export class ImageValidator {
  static validate(portalImage: ImageForm, imageConstraints: ImageConstraints) {
    const errors = []
    if (portalImage.file == null || portalImage.image == null) {
      throw new Error('Remote images cannot be validated at the moment.')
    }
    if (
      imageConstraints.mimeTypes.length > 0 &&
      !imageConstraints.mimeTypes.includes(portalImage.file.type)
    ) {
      errors.push(
        new Error(
          `Die Datei beinhaltet einen falschen Dateityp (${portalImage.file.type}). Zugelassen sind nur die folgenden Dateitypen ${imageConstraints.mimeTypes.join(', ')}.`
        )
      )
    }
    if (
      imageConstraints.sizeInBytes != null &&
      portalImage.file.size > imageConstraints.sizeInBytes
    ) {
      const { displayFileSize } = useFileUtils()
      errors.push(
        new Error(
          `Die maximale Dateigröße beträgt ${displayFileSize(imageConstraints.sizeInBytes)}. Die Dateigröße des Bildes beträgt ${displayFileSize(portalImage.file.size)}.`
        )
      )
    }
    if (
      imageConstraints.width != null &&
      portalImage.image.width !== imageConstraints.width
    ) {
      errors.push(
        new Error(
          `Die Breite des eingegebenen Bildes misst ${portalImage.image.width} px. Die akzeptierte Breite ist ${imageConstraints.width} px.`
        )
      )
    }
    if (
      imageConstraints.height != null &&
      portalImage.image.height !== imageConstraints.height
    ) {
      errors.push(
        new Error(
          `Die Höhe des eingegebenen Bildes misst ${portalImage.image.height} px. Die akzeptierte Höhe ist ${imageConstraints.height} px.`
        )
      )
    }
    return errors
  }
}
