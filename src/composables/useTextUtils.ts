// global Voucher Display functions

export function useTextUtils() {
    const truncate = (value: string, limitChars = 32, postfix = '...') => {
        if (value.length > limitChars) {
            return value.slice(0, limitChars).concat(postfix)
        }
        return value
    }
    const toDisplayString = (value: string, defaultValue: string = 'Keine Angabe') => {
        return value || defaultValue
    }
    return {truncate, toDisplayString}
}
