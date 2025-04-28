export function useAddressUtils() {
  const isValidStreet = (value: string) => {
    if (!value) {
      return true
    }
    const regex = /^(.*)\s([0-9]+)(.*)$/
    return regex.test(value)
  }

  const isValidPostalCode = (value: string) => {
    if (!value) {
      return true
    }
    const regex = /^[0-9]{5}$/
    return regex.test(value)
  }

  return { isValidStreet, isValidPostalCode }
}
