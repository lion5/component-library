import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import type { FirebaseError } from 'firebase/app'

export function useFirebaseStorage() {
  const storage = getStorage()

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
      contentType: file.type,
    }
  }

  const getImageUrl = async (storageURI: string) => {
    // Create a reference from a Google Cloud Storage URI
    const gsReference = ref(storage, storageURI)
    return await getDownloadURL(gsReference)
  }

  return { uploadFile, getImageUrl }
}
