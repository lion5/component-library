import { describe, expect, it } from 'vitest'
import { ImageSizes } from '@core/components/image/models/imageSizes'

describe('Model ImageSizes', () => {
  it('should clone data correctly', () => {
    const imageSizes = new ImageSizes(
      'originalUrl',
      'tinyUrl',
      'smallUrl',
      'midUrl',
      'largeUrl'
    )
    const clone = imageSizes.clone()
    expect(clone).not.toBe(imageSizes)
    expect(clone).toStrictEqual(imageSizes)
  })
})
