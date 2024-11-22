export function useIbanUtils() {
  const toFormattedIBAN = (rawIban?: string) => {
    if (!rawIban) {
      return ''
    }
    const rawIBANMaxLength = 34
    rawIban = rawIban.slice(0, rawIBANMaxLength)
    const regex = /[\s\S]{1,4}/g
    const ibanParts = rawIban.match(regex) || []
    return ibanParts.join(' ').toUpperCase()
  }

  const toRawIBAN = (value: string) => {
    return value.replace(/\s/g, '').toUpperCase()
  }

  const isValidIBAN = (value: string) => {
    if (!value) {
      return true
    }
    // TODO: look for better solution that doesn't validate the white spaces: https://github.com/lion5/bonista-coupons/issues/2753
    value = value.replace(/\s/g, '')
    const regex = /^[A-Z]{2}[0-9]{2}[A-Z0-9]{0,30}$/
    return regex.test(value)
  }

  return { toFormattedIBAN, toRawIBAN, isValidIBAN }
}
