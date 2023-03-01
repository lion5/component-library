import {ImageSizes} from "@/atoms/image/models/imageSizes";
import {useImageUtils} from "@/atoms/dragdrop/ImageDropArea/useImageUtils";

export interface ApiPortalImage {
  id: number
  alt: string
  original: string
  tiny: string
  small: string
  mid: string
  large: string
}

export class PortalImage {
  readonly id: number | undefined
  alt: string | undefined
  file: File | undefined
  image: HTMLImageElement | undefined
  sizes: ImageSizes
  busy: boolean
  removed: boolean
  errors: Error[]

  constructor(
    id: number | undefined = undefined,
    alt: string | undefined = undefined,
    file: File | undefined = undefined,
    imageElement: HTMLImageElement | undefined = undefined,
    sizes = new ImageSizes(),
    busy = false,
    removed = false,
    errors: Error[] = []
  ) {
    this.id = id
    this.alt = alt
    this.file = file
    this.image = imageElement
    this.sizes = sizes
    this.busy = busy
    this.removed = removed
    this.errors = errors
  }

  /**
   * Returns true if the image is published, which is the case when its id is a non-negative integer.
   */
  isPublished(): boolean {
    if (this.id == null) {
      return false
    }
    return this.id > -1
  }

  hasErrors() {
    return this.errors.length > 0
  }

  static async fromFile(file: File): Promise<PortalImage> {
    if (!file) {
      throw new Error('A image file is required!')
    }
    const {getDataUrlFromFile} = useImageUtils()
    const dataUrl = await getDataUrlFromFile(file) as string
    return new PortalImage(
      -1,
      'Lokales Bild',
      file,
      await PortalImage.getImage(dataUrl),
      new ImageSizes(dataUrl)
    )
  }

  static fromApi(json: ApiPortalImage | undefined) {
    if (!json) {
      return
    }
    const imageSizes = new ImageSizes(
      json.original,
      json.tiny,
      json.small,
      json.mid,
      json.large
    )
    return new PortalImage(
      json.id,
      json.alt,
      undefined,
      undefined,
      imageSizes
    )
  }

  static async getImage(dataUrl: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
      const img = new Image()
      img.src = dataUrl
      img.onload = function () {
        resolve(this as HTMLImageElement)
      }
      img.onerror = err => reject(err)
    })
  }

  clone() {
    return new PortalImage(
      this.id,
      this.alt,
      this.file,
      this.image,
      this.sizes.clone(),
      this.busy,
      this.removed,
      this.errors
    )
  }
}
