import { PortalImage } from '@core/atoms/image/models/image'
import { ImageSizes } from '@core/atoms/image/models/imageSizes'
import { Gallery } from '@core/atoms/image/models/gallery'

export const portalImageApiData = {
  id: 1,
  alt: 'alt1',
  original: 'originalUrl',
  large: 'largeUrl',
  mid: 'midUrl',
  small: 'smallUrl',
  tiny: 'tinyUrl'
}

export const portalImage = new PortalImage(
  1,
  'alt1',
  undefined,
  undefined,
  new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
  false,
  false,
  []
)

export const portalImageWithFile = new PortalImage(
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

export const gallery = new Gallery([
  new PortalImage(
    1,
    'alt1',
    undefined,
    undefined,
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
    false,
    false,
    []
  ),
  new PortalImage(
    2,
    'alt2',
    undefined,
    undefined,
    new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl'),
    false,
    false,
    []
  ),
  new PortalImage(
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
