import { ImageResponse } from '@core/models/image/imageResponse'
import { ApiImage } from '@core/models/image/imageForm'

export class Gallery {
  readonly images: ImageResponse[]

  constructor(images: ImageResponse[] = []) {
    this.images = images
  }

  isEmpty() {
    return this.images.length === 0
  }

  static fromApi(rawImages: ApiImage[]) {
    if (rawImages == null) {
      return new Gallery()
    }
    return new Gallery(
      rawImages
        .map((rawImage: ApiImage) => ImageResponse.fromApi(rawImage))
        .filter((image: ImageResponse | undefined) => image) as ImageResponse[]
    )
  }
}
