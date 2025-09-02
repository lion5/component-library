import { ImageSizes } from '@core/models/image/imageSizes'

export interface ApiImage {
  id: number
  alt: string
  original: string
  tiny: string
  small: string
  mid: string
  large: string
}

export class ImageResponse {
  readonly id: number
  readonly alt: string
  readonly sizes: ImageSizes

  constructor(id: number, alt: string, sizes: ImageSizes) {
    this.id = id
    this.alt = alt
    this.sizes = sizes
  }

  static fromApi(json: ApiImage | undefined) {
    if (!json) {
      return
    }
    const imageSizes = new ImageSizes(json.original, json.tiny, json.small, json.mid, json.large)
    return new ImageResponse(json.id, json.alt, imageSizes)
  }
}
