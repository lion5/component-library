import { describe, expect, it } from 'vitest'
import { useDate } from './useDate'

/**
 * Note: these tests fail on a device with timezone != UTC / GMT, so they should
 * only be run via the npm scripts.
 */
describe('useDate.ts', () => {
  it('getDateTime - returns correct formatted string using date', () => {
    const date = new Date('2023-04-20T14:13:45.000Z')
    const { getDateTime } = useDate()
    expect(getDateTime(date)).toBe('Do., 20. April um 14:13')
  })

  it('getFormattedTime - returns correct formatted string using date', () => {
    const date = new Date('2023-04-20T14:13:45.000Z')
    const { getFormattedTime } = useDate()
    expect(getFormattedTime(date)).toBe('14:13')
  })

  it('getFormattedWeekdayHour - returns correct formatted string using date', () => {
    const date = new Date('2023-04-20T14:13:45.000Z')
    const { getFormattedWeekdayHour } = useDate()
    expect(getFormattedWeekdayHour(date)).toBe('Do, 14 Uhr')
  })

  it('getFormattedTime - returns correct formatted string using date', () => {
    const date = new Date('2023-04-20T14:13:45.000Z')
    const { getLongWeekday } = useDate()
    expect(getLongWeekday(date)).toBe('Donnerstag')
  })

  it('getDateTimeLocalInputValue - returns expected string in format YYYY-MM-DDThh:mm', () => {
    const { getDateTimeLocalInputValue } = useDate()
    const date = new Date('2000-01-23T12:34:56.999Z')
    const expectedString = '2000-01-23T12:34'

    expect(getDateTimeLocalInputValue(date)).toBe(expectedString)
  })
})
