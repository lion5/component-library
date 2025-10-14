// global Voucher Display functions

import { formatTimeAgo, UseTimeAgoUnit, UseTimeAgoUnitNamesDefault } from '@vueuse/core'

export type DateFormat = 'month YYYY' | 'dd.mm.YYYY' | 'dd.mm.YYYY HH:MM' | 'timeAgo'

export function useDateUtils() {
  const getFirstDayOfMonth = (date: Date) => {
    date.setDate(1)
    date.setHours(0, 0, 0)
    return date
  }
  const setTimeToEndOfDay = (date: Date) => {
    date.setHours(23, 59, 59)
    return date
  }

  const toMMYYYY = (value: Date | string) => {
    if (!value) return ''
    const date = new Date(value)
    date.setHours(0, 0, 0, 0)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'short'
    }
    if (date < new Date(0)) {
      return ''
    }
    return date.toLocaleDateString('de-DE', options)
  }

  const toddmmYYYYDate = (value: Date | string) => {
    if (!value) return ''
    const date = new Date(value)
    date.setHours(0, 0, 0, 0)

    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }
    if (date < new Date(0)) {
      return ''
    }
    return date.toLocaleDateString('de-DE', options)
  }
  const toddmmYYYYHHMM = (value: Date | string) => {
    if (!value) return ''
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }
    return new Date(value).toLocaleString('de-DE', options)
  }

  const toDateTimeString = (dateTime: Date, formatString: DateFormat) => {
    switch (formatString) {
      case 'month YYYY':
        return toMMYYYY(dateTime)
      case 'dd.mm.YYYY':
        return toddmmYYYYDate(dateTime)
      case 'dd.mm.YYYY HH:MM':
        return toddmmYYYYHHMM(dateTime)
      case 'timeAgo':
        return formatTimeAgo(dateTime, {
          messages: {
            justNow: 'gerade eben',
            past: n => n.match(/\d/) ? `vor ${n}` : n,
            future: n => n.match(/\d/) ? `in ${n}` : n,
            month: (n, past) => n === 1
              ? past
                ? 'letzter Monat'
                : 'nächster Monat'
              : `${n} Monat${n > 1 ? 'e' : ''}`,
            year: (n, past) => n === 1
              ? past
                ? 'letztes Jahr'
                : 'nächstes Jahr'
              : `${n} Jahr${n > 1 ? 'e' : ''}`,
            day: (n, past) => n === 1
              ? past
                ? 'gestern'
                : 'morgen'
              : `${n} Tag${n > 1 ? 'e' : ''}`,
            week: (n, past) => n === 1
              ? past
                ? 'letzte Woche'
                : 'nächste Woche'
              : `${n} Woche${n > 1 ? 'n' : ''}`,
            hour: n => `${n} Stunde${n > 1 ? 'n' : ''}`,
            minute: n => `${n} Minute${n > 1 ? 'n' : ''}`,
            second: n => `${n} Sekunde${n > 1 ? 'n' : ''}`,
            invalid: '',
          }
        })
    }
  }
  return {
    getFirstDayOfMonth,
    setTimeToEndOfDay,
    toMMYYYY,
    toddmmYYYYDate,
    toddmmYYYYHHMM,
    toDateTimeString
  }
}
