import { describe, expect, it } from 'vitest'
import { useDateUtils } from '@core/composables/useDateUtils'

describe('useDateUtils.ts', () => {
  describe('toddmmYYYYDate', () => {
    it('shall return DE date format on iso 8601 date input', () => {
      const { toddmmYYYYDate } = useDateUtils()
      const dateString = toddmmYYYYDate('2021-10-22T14:45')
      expect(dateString).toBe('22.10.2021')
    })

    it('shall return empty string on empty', () => {
      const { toddmmYYYYDate } = useDateUtils()
      let dateString = toddmmYYYYDate('')
      expect(dateString).toStrictEqual('')
      dateString = toddmmYYYYDate(undefined as unknown as Date)
      expect(dateString).toStrictEqual('')
    })
  })
  describe('Date conversion', () => {
    it('Shall be able to set day to the first day of the month', () => {
      const date = new Date()
      const { getFirstDayOfMonth } = useDateUtils()
      const dateAtFirstDayOfTheMonth = getFirstDayOfMonth(date)
      date.setDate(1)
      date.setHours(0, 0, 0)
      expect(dateAtFirstDayOfTheMonth).toBe(date)
    })
    it('Shall be able to set time to the end of the day', () => {
      const date = new Date()
      const { setTimeToEndOfDay } = useDateUtils()
      const dateAtEndOfTheDay = setTimeToEndOfDay(date)
      date.setHours(23, 59, 59)
      expect(dateAtEndOfTheDay).toBe(date)
    })
  })
})
