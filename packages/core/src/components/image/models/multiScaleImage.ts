import { ImageSizes } from '@core/components'

export class MultiScaleImage {
  readonly id: number
  readonly alt: string
  readonly sizes: ImageSizes

  constructor(id: number, alt: string, sizes: ImageSizes) {
    this.id = id
    this.alt = alt
    this.sizes = sizes
  }

  clone() {
    return new MultiScaleImage(this.id, this.alt, this.sizes.clone())
  }
}
