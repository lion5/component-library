import { dateMixin } from '@/base/mixins/dateMixin'
import { describe, expect, it } from 'vitest'

describe('useDateUtils.ts', () => {
  describe('toddmmYYYYDate', () => {
    it('shall return DE date format on iso 8601 date input', () => {
      const dateString = dateMixin.filters.toddmmYYYYDate('2021-10-22T14:45')
      expect(dateString).toBe('22.10.2021')
    })

    it('shall return empty string on empty', () => {
      let dateString = dateMixin.filters.toddmmYYYYDate('')
      expect(dateString).toStrictEqual('')
      dateString = dateMixin.filters.toddmmYYYYDate(undefined)
      expect(dateString).toStrictEqual('')
    })
  })
  describe('Date conversion', () => {
    it('Shall be able to set day to the first day of the month', () => {
      const date = new Date()
      const dateAtFirstDayOfTheMonth = dateMixin.methods.getFirstDayOfMonth(date)
      date.setDate(1)
      date.setHours(0, 0, 0)
      expect(dateAtFirstDayOfTheMonth).toBe(date)
    })
    it('Shall be able to set time to the end of the day', () => {
      const date = new Date()
      const dateAtEndOfTheDay = dateMixin.methods.setTimeToEndOfDay(date)
      date.setHours(23, 59, 59)
      expect(dateAtEndOfTheDay).toBe(date)
    })
  })
})
