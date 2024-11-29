export class MinimalImage {
  readonly id: number
  readonly alt: string
  readonly url: string

  constructor(id: number, alt: string, url: string) {
    this.id = id
    this.alt = alt
    this.url = url
  }

  clone() {
    return new MinimalImage(this.id, this.alt, this.url)
  }
}
