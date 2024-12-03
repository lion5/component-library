import { describe, expect, it } from 'vitest'
import { ImageSizes } from '@core/models/image/imageSizes'

describe('imageSizes.ts', () => {
  it('clone - should clone', () => {
    const imageSizes = new ImageSizes('originalUrl', 'tinyUrl', 'smallUrl', 'midUrl', 'largeUrl')
    const clone = imageSizes.clone()
    expect(clone).not.toBe(imageSizes)
    expect(clone).toStrictEqual(imageSizes)
  })
})
