export function useNumber() {
  const getFormattedNumber = (value: number | null | undefined) => {
    if (value == null) return ''
    return new Intl.NumberFormat('de-DE').format(value)
  }

  return { getFormattedNumber }
}
