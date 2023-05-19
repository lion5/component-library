export function useDate() {
  const _getDateObject = (dateFormat: Date | string | number) => {
    return new Date(dateFormat)
  }
  const getFormattedTime = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const getFormattedWeekdayHour = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      hour: '2-digit',
      weekday: 'short',
    })
  }
  const getLongWeekday = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      weekday: 'long',
    })
  }

  const getDateTime = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  /**
   * Formats the provided UTC date to a string value used for HTML inputs with
   * type datetime-local.
   * For details see: https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/datetime-local#value.
   * @param date The date value to be parsed.
   * @return The parsed string in the format "YYYY-MM-DDThh:mm".
   */
  const getDateTimeLocalInputValue = (date: Date): string => {
    // substract timezone offset, as browser will use the local timezone
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().slice(0, 16)
  }

  return {
    getDateTime,
    getFormattedTime,
    getFormattedWeekdayHour,
    getLongWeekday,
    getDateTimeLocalInputValue,
  }
}
