export function useFileUtils() {
  /**
   * Converts a bytes number into a human-readable typed string
   *
   * Build on top of the following implementation https://stackoverflow.com/a/20732091
   *
   * @param byteValue the bytes that shall be converted to a human-readable string
   * @returns {string} the formatted string
   */
  const displayFileSize = (byteValue: number) => {
    const signs = ['B', 'KiB', 'MiB']

    const i =
      byteValue === 0 ? 0 : Math.floor(Math.log(byteValue) / Math.log(1024))
    const size = byteValue / Math.pow(1024, i)

    const formattedNumber = new Intl.NumberFormat('de-DE', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(size)
    return `${formattedNumber}\u00A0${signs[i]}`
  }
  return { displayFileSize }
}
