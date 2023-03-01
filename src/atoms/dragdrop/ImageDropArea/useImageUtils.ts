// global Voucher Display functions

export function useImageUtils() {
    const getDataUrlFromFile = (file: File) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => {
                resolve(reader.result)
            }
            reader.onerror = err => reject(err)
            reader.readAsDataURL(file)
        })
    }

    // converts bytes to megabytes float with two decimals
    /**
     * @deprecated Use the more generic version that auto select best type {@link fileMixin.methods.displayFileSize}
     * @param byteValue
     * @returns {string}
     */
    const toMegaBytes = (byteValue: number) => {
        const megaBytesDecimal = byteValue * 1.0 / 1024 / 1024
        return new Intl.NumberFormat('de-DE', {
            style: 'decimal',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(megaBytesDecimal)
    }

    return {getDataUrlFromFile, toMegaBytes}
}
