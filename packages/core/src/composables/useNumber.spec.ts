import { describe, expect, it } from 'vitest'
import { useNumber } from './useNumber'

describe('useNumber.ts', () => {
  it('getFormattedNumber - returns correct formatted string', () => {
    const { getFormattedNumber } = useNumber()
    expect(getFormattedNumber(34.54)).toBe('34,54')
  })
  it('getFormattedNumber - returns empty string if no number given', () => {
    const { getFormattedNumber } = useNumber()
    expect(getFormattedNumber(undefined)).toBe('')
  })
})
