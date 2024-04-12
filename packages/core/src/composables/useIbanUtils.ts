export function useIbanUtils() {
  const toIBANString = (value: string) => {
    const regex = /[\s\S]{1,4}/g
    const ibanParts = value.match(regex) || []
    return ibanParts.join(' ')
  }

  return { toIBANString }
}
