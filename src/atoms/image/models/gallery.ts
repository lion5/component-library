import {ApiPortalImage, PortalImage} from "@/atoms/image/models/image";
import {arrayMixin} from "@/models/arrayMixin";

export class Gallery {
  images: PortalImage[]

  constructor(images: PortalImage[] = []) {
    this.images = images
  }

  hasErrors() {
    return this.getImages().filter(image => image.hasErrors()).length > 0
  }

  areAllImagesPublished() {
    return this.getImages().filter(image => !image.isPublished()).length === 0
  }

  arePublishedImagesRemoved() {
    return this.images.filter(image => (image.removed && image.isPublished())).length > 0
  }

  isEmpty() {
    return this.images.length === 0
  }

  addImage(image: PortalImage) {
    this.images = [...this.images, image]
  }

  getImages() {
    return this.images.filter(image => !image.removed)
  }

  moveImage(fromIndex: number, toIndex: number) {
    arrayMixin.methods.moveInArray(this.images, fromIndex, toIndex)
  }

  static fromApi(rawImages: ApiPortalImage[]) {
    if (rawImages == null) {
      return new Gallery()
    }
    return new Gallery(
      rawImages
        .map((rawImage: ApiPortalImage) => PortalImage.fromApi(rawImage))
        .filter((image: PortalImage | undefined) => image) as PortalImage[]
    )
  }

  clone() {
    return new Gallery(this.images.map(image => image.clone()))
  }
}
