export function useImageUtils() {
  /**
   * Get a data URL from a file
   *
   * @param file - The file to get the data URL from
   */
  const getDataUrlFromFile = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => {
        resolve(reader.result as string)
      }
      reader.onerror = (err) => reject(err)
      reader.readAsDataURL(file)
    })
  }

  return {
    getDataUrlFromFile
  }
}
