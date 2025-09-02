import { ImageForm } from '@core/models/image/imageForm'
import { Gallery } from '@core/models/image/gallery'
import { useArrayUtils } from '@core/composables/useArrayUtils'

export class GalleryForm {
  images: ImageForm[]

  constructor(images: ImageForm[] = []) {
    this.images = images
  }

  hasErrors() {
    return this.getImages().filter((image) => image.hasErrors()).length > 0
  }

  areAllImagesPublished() {
    return this.getImages().filter((image) => !image.isPublished()).length === 0
  }

  arePublishedImagesRemoved() {
    return this.images.filter((image) => image.removed && image.isPublished()).length > 0
  }

  isEmpty() {
    return this.images.length === 0
  }

  addImage(image: ImageForm) {
    this.images = [...this.images, image]
  }

  getImages() {
    return this.images.filter((image) => !image.removed)
  }

  moveImage(fromIndex: number, toIndex: number) {
    const { moveInArray } = useArrayUtils()
    moveInArray(this.images, fromIndex, toIndex)
  }

  static fromGallery(gallery: Gallery) {
    return new GalleryForm(gallery.images.map((image) => ImageForm.fromImage(image)))
  }

  clone() {
    return new GalleryForm(this.images.map((image) => image.clone()))
  }
}
