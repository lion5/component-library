import { ImageForm } from '@core/models/image/imageForm'
import { ImageSizes } from '@core/models/image/imageSizes'
import { GalleryForm } from '@core/models/image/galleryForm'
import { Gallery } from '@core/models/image/gallery'
import { ImageResponse } from '@core/models/image/imageResponse'

export const fakeImageResponseApi = {
  id: 1,
  alt: 'alt1',
  original: 'originalUrl',
  large: 'largeUrl',
  mid: 'midUrl',
  small: 'smallUrl',
  tiny: 'tinyUrl'
}

export const fakeImageResponse = new ImageResponse(
  fakeImageResponseApi.id,
  fakeImageResponseApi.alt,
  new ImageSizes(
    fakeImageResponseApi.original,
    fakeImageResponseApi.tiny,
    fakeImageResponseApi.small,
    fakeImageResponseApi.mid,
    fakeImageResponseApi.large
  )
)

export const fakeImageForm = new ImageForm(
  fakeImageResponse.id,
  fakeImageResponse.alt,
  undefined,
  undefined,
  fakeImageResponse.sizes,
  false,
  false,
  []
)

export const portalImageWithFile = new ImageForm(
  -1,
  'alt1',
  new File(['Hello World'], 'HelloWorld', { type: 'image/jpg' }),
  new Image(1200, 600),
  new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
  false,
  false,
  []
)

export const galleryAPIData = [
  {
    id: 1,
    alt: 'alt1',
    original: 'originalUrl',
    large: 'largeUrl',
    mid: 'midUrl',
    small: 'smallUrl',
    tiny: 'tinyUrl'
  },
  {
    id: 2,
    alt: 'alt2',
    original: 'originalUrl',
    large: 'largeUrl',
    mid: 'midUrl',
    small: 'smallUrl',
    tiny: 'tinyUrl'
  },
  {
    id: 3,
    alt: 'alt3',
    original: 'originalUrl',
    large: 'largeUrl',
    mid: 'midUrl',
    small: 'smallUrl',
    tiny: 'tinyUrl'
  }
]

export const galleryForm = new GalleryForm([
  new ImageForm(
    1,
    'alt1',
    undefined,
    undefined,
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
    false,
    false,
    []
  ),
  new ImageForm(
    2,
    'alt2',
    undefined,
    undefined,
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
    false,
    false,
    []
  ),
  new ImageForm(
    3,
    'alt3',
    undefined,
    undefined,
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
    false,
    false,
    []
  )
])

export const gallery = new Gallery([
  new ImageResponse(
    1,
    'alt1',
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl')
  ),
  new ImageResponse(
    2,
    'alt2',
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl')
  ),
  new ImageResponse(
    3,
    'alt3',
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl')
  )
])

export interface ScrollEventDetails {
  x: number
  y: number
  isScrolling: boolean
  arrivedState: {
    left: boolean
    right: boolean
    top: boolean
    bottom: boolean
  }
  directions: {
    left: boolean
    right: boolean
    top: boolean
    bottom: boolean
  }
  measure: () => void
}

export const mockScrollEventDetails: ScrollEventDetails = {
  x: 0,
  y: 0,
  isScrolling: false,
  arrivedState: {
    left: false,
    right: false,
    top: false,
    bottom: false
  },
  directions: {
    left: false,
    right: false,
    top: false,
    bottom: false
  },
  measure: () => {
  }
}
