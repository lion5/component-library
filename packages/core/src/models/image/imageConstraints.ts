export class ImageConstraints {
  readonly mimeTypes: string[]
  readonly aspectRatio: string | undefined
  readonly width: number | undefined
  readonly height: number | undefined
  readonly sizeInBytes: number | undefined

  constructor(
    mimeTypes: string[] = [],
    aspectRatio?: string,
    width?: number,
    height?: number,
    sizeInBytes?: number
  ) {
    this.mimeTypes = mimeTypes
    this.aspectRatio = aspectRatio
    this.width = width
    this.height = height
    this.sizeInBytes = sizeInBytes
  }
}
