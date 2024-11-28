export function useAddressUtils() {
  const isValidStreet = (value: string) => {
    if (!value) {
      return true
    }
    const regex = /^(.*)\s([0-9]+)(.*)$/
    return regex.test(value)
  }

  return { isValidStreet }
}
