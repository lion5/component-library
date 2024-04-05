import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import type { FirebaseError } from 'firebase/app'

/**
 * Provides firebase function to upload and display images
 */
export function useFirebaseStorage() {
  const storage = getStorage()

  /**
   * uploads a file to a given cloud storage file path
   *
   * @param file the file that shall be uploaded to a bucket
   * @param filePath the location inside the cloud storage
   */
  const uploadFile = async (file: File, filePath: string): Promise<string> => {
    const storageRef = ref(storage, filePath)

    try {
      const result = await uploadBytes(storageRef, file, getFileMetadata(file))
      return result.ref.fullPath
    } catch (error: unknown) {
      switch ((error as FirebaseError).code) {
        case 'storage/unauthorized':
          throw new Error('Bild-Upload fehlgeschlagen: Fehlende Berechtigung')

        case 'storage/canceled':
          throw new Error('Bild-Upload abgebrochen.')

        default:
          throw new Error('Unbekannter Fehler beim Bild-Upload.')
      }
    }
  }

  const getFileMetadata = (file: File) => {
    return {
      contentType: file.type
    }
  }

  /**
   * returns the download url of the given storageUri
   *
   * @param storageURI the storageURI of a storage item that shall be downloaded
   */
  const getImageUrl = async (storageURI: string) => {
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, storageURI)
    return await getDownloadURL(gsReference)
  }

  return { uploadFile, getImageUrl }
}
