const _isStreetWithHouseNumber = (value: string) => {
  if (!value) {
    return true
  }
  const regex = /^(.*)\s([0-9]+)(.*)$/
  return regex.test(value)
}

export const streetWithHouseNumber = (street: string) =>
  _isStreetWithHouseNumber(street) ||
  'Geben Sie bitte Straßenname mit Hausnummer ein. Bsp.: An der Weberei 5'
