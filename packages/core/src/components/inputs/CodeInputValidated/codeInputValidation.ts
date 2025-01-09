export const allowedCodeCharacters = 'A-Z\\d'

export const codeValidation = (value: string): boolean => {
  const regex = `[${allowedCodeCharacters}]{8}$`
  return value.match(regex) != null
}
