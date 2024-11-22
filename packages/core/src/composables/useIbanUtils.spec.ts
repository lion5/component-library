import { describe, expect, it } from 'vitest'
import { useIbanUtils } from '@core/composables/useIbanUtils'

describe('useIbanUtils.ts', () => {
  it('toFormattedIBAN - return empty string if nothing given', () => {
    const { toFormattedIBAN } = useIbanUtils()
    expect(toFormattedIBAN()).toBe('')
  })

  it('toFormattedIBAN - return formatted iban if iban given', () => {
    const { toFormattedIBAN } = useIbanUtils()
    expect(toFormattedIBAN('DE12345678901112131415')).toBe('DE12 3456 7890 1112 1314 15')
  })

  it('toFormattedIBAN - return cut of strings that are larger than 34 character', () => {
    const { toFormattedIBAN } = useIbanUtils()
    expect(toFormattedIBAN('DE1234567890111213141516171819202122')).toBe('DE12 3456 7890 1112 1314 1516 1718 1920 21')
  })

  it('toRawIBAN - remove iban white spaces', () => {
    const { toRawIBAN } = useIbanUtils()
    expect(toRawIBAN('DE12 3456 7890 1112 1314 15')).toBe('DE12345678901112131415')
  })

  it('toRawIBAN - return empty string if empty string given', () => {
    const { toRawIBAN } = useIbanUtils()
    expect(toRawIBAN('')).toBe('')
  })

  it('isValidIBAN - return true if german iban is used', () => {
    const { isValidIBAN } = useIbanUtils()
    expect(isValidIBAN('DE12 3456 7890 1112 1314 15')).toBe(true)
  })

  it('isValidIBAN - return false if is too short', () => {
    const { isValidIBAN } = useIbanUtils()
    expect(isValidIBAN('DE')).toBe(false)
  })
})
