import { describe, expect, it } from 'vitest'
import { useWindDirection } from '@/dashboard/widgets/weather/composables/useWindDirection'

describe('useWindDirection.ts', () => {
  it.each([
    { degree: 0, expected: 'N' },
    { degree: 22, expected: 'N' },
    { degree: 23, expected: 'NO' },
    { degree: 45, expected: 'NO' },
    { degree: 90, expected: 'O' },
    { degree: 135, expected: 'SO' },
    { degree: 180, expected: 'S' },
    { degree: 225, expected: 'SW' },
    { degree: 270, expected: 'W' },
    { degree: 315, expected: 'NW' },
    { degree: 337, expected: 'NW' },
    { degree: 338, expected: 'N' },
  ])(
    'getDirectionName - returns "$expected" if $degree° given',
    ({ degree, expected }) => {
      const { getDirectionName } = useWindDirection()
      expect(getDirectionName(degree)).toBe(expected)
    }
  )

  it('getDirectionName - returns empty string if degree is null', () => {
    const { getDirectionName } = useWindDirection()
    expect(getDirectionName(null)).toBe('')
  })
})
