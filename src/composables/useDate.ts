/**
 * Provides different date format functions
 */
export function useDate() {
  const _getDateObject = (dateFormat: Date | string | number) => {
    return new Date(dateFormat)
  }
  /**
   * Returns a date string with following format "<HH>:<MM>". Example 14:13
   * @param dateFormat can be a js date object, an ISO 8601 formatted string or a number in unix timestamp in milliseconds
   */
  const getFormattedTime = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleTimeString('de-DE', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  /**
   * Returns a date string with following format "<weekday short>, <HH> Uhr". Example Do, 14 Uhr
   * @param dateFormat can be a js date object, an ISO 8601 formatted string or a number in unix timestamp in milliseconds
   */
  const getFormattedWeekdayHour = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      hour: '2-digit',
      weekday: 'short'
    })
  }
  /**
   * Returns a date string with following format "<weekday long>". Example Donnerstag
   * @param dateFormat can be a js date object, an ISO 8601 formatted string or a number in unix timestamp in milliseconds
   */
  const getLongWeekday = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      weekday: 'long'
    })
  }

  /**
   * Returns a date string with following format "<weekday short>., <dd>. <month long> um <HH>:<MM>". Example Do., 20. April um 14:13
   * @param dateFormat can be a js date object, an ISO 8601 formatted string or a number in unix timestamp in milliseconds
   */
  const getDateTime = (dateFormat: Date | string | number) => {
    const date = _getDateObject(dateFormat)
    return date.toLocaleString('de-DE', {
      weekday: 'short',
      day: '2-digit',
      month: 'long',
      hour: '2-digit',
      minute: '2-digit'
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
    // subtract timezone offset, as browser will use the local timezone
    date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
    return date.toISOString().slice(0, 16)
  }

  return {
    getDateTime,
    getFormattedTime,
    getFormattedWeekdayHour,
    getLongWeekday,
    getDateTimeLocalInputValue
  }
}
