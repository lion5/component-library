// global Voucher Display functions

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
  return {
    getFirstDayOfMonth,
    setTimeToEndOfDay,
    toMMYYYY,
    toddmmYYYYDate,
    toddmmYYYYHHMM
  }
}
