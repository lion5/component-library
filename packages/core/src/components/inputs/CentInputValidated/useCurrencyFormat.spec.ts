import { describe, expect, it } from 'vitest'
import { useCurrencyFormat } from '@core/components/inputs/CentInputValidated/useCurrencyFormat'

describe('useCurrencyFormat', () => {
  it.each([
    { given: 0, expected: '00,00' },
    { given: 1, expected: '00,01' },
    { given: 12, expected: '00,12' },
    { given: 123, expected: '01,23' },
    { given: 1234, expected: '12,34' },
    { given: 12345, expected: '123,45' }
  ])('toEuroStringFromCentNumber - returns $expected if $given is given', ({ given, expected }) => {
    const { toEuroStringFromCentNumber } = useCurrencyFormat()
    expect(toEuroStringFromCentNumber(given)).toBe(expected)
  })

  it.each([
    { given: '', expected: '00,00' },
    { given: '0', expected: '00,00' },
    { given: '1', expected: '00,01' },
    { given: '12', expected: '00,12' },
    { given: '123', expected: '01,23' },
    { given: '1234', expected: '12,34' },
    { given: '12345', expected: '123,45' }
  ])('toEuroStringFromCentString - returns $expected if $given is given', ({ given, expected }) => {
    const { toEuroStringFromCentString } = useCurrencyFormat()
    expect(toEuroStringFromCentString(given)).toBe(expected)
  })
})
