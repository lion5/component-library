import { describe, expect, it } from 'vitest'
import { useAddressUtils } from '@core/components/inputs/AddressInput/useAddressUtils'

describe('useAddressUtils.ts', () => {
  it('isValidStreet - return false if street number missing', () => {
    const { isValidStreet } = useAddressUtils()
    expect(isValidStreet('Test Street')).toBe(false)
  })

  it('isValidStreet - return true if street and number given', () => {
    const { isValidStreet } = useAddressUtils()
    expect(isValidStreet('Test Street 1')).toBe(true)
  })

  it('isValidStreet - return true if street, number and addition given', () => {
    const { isValidStreet } = useAddressUtils()
    expect(isValidStreet('Test Street 1b')).toBe(true)
  })
})
