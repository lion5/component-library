export function useNumber() {
  /**
   * Returns the formatted string for the given number using de-DE as locale.
   * If the value is null or undefined an empty string is returned.
   *
   * @param value the number that shall be formatted
   */
  const getFormattedNumber = (value: number | null | undefined) => {
    if (value == null) return ''
    return new Intl.NumberFormat('de-DE').format(value)
  }

  return { getFormattedNumber }
}
