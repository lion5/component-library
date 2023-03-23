export class ImageSizes {
  readonly original: string
  readonly tiny: string
  readonly small: string
  readonly mid: string
  readonly large: string

  constructor(
    original = '',
    tiny = '',
    small = '',
    mid = '',
    large = ''
  ) {
    this.original = original
    this.tiny = tiny
    this.small = small
    this.mid = mid
    this.large = large
  }

  clone() {
    return new ImageSizes(
      this.original,
      this.tiny,
      this.small,
      this.mid,
      this.large
    )
  }
}
