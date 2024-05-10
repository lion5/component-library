export function useCurrencyFormat() {
  const INITIAL_VALUE_SIZE = 4

  /**
   * Fills a string with zeros to a fixed size
   * @param value The string to fill with zeros
   */
  const _fillWithZeros = (value: string) => {
    const missingZeros = INITIAL_VALUE_SIZE - value.length
    if (missingZeros <= 0) {
      return value
    }
    return '0'.repeat(missingZeros) + value
  }

  /**
   * Formats a string of cents to a currency string
   *
   * @param centsString The string of cents (e.g. '1234' for 12,34€)
   */
  const toEuroStringFromCentString = (centsString: string) => {
    const filledValue = _fillWithZeros(centsString)
    return filledValue.slice(0, -2) + ',' + filledValue.slice(-2)
  }

  /**
   * Converts a number of cents to a string representation of euros
   *
   * @param cents The number of cents (e.g. 234 for 02,34€)
   */
  const toEuroStringFromCentNumber = (cents: number) => {
    const string = cents.toString()
    return toEuroStringFromCentString(string)
  }

  return {
    toEuroStringFromCentString,
    toEuroStringFromCentNumber
  }
}
