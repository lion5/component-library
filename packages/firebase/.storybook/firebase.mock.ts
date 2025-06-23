// packages/firebase/.storybook/firebase.mock.ts
import { fn } from 'storybook/test'
import type { FirebaseStorage, StorageReference, UploadResult } from 'firebase/storage'

export const getDownloadURL = fn(async (ref: StorageReference) => {
  // Gibt eine Platzhalter-URL zurück, die den Pfad für die Demo anzeigt
  console.log(`Mock getDownloadURL called for ref: ${ref}`)
  return Promise.resolve(ref.fullPath)
})
  .mockName('getDownloadURL')

export const ref = fn(
  (_storage: FirebaseStorage, path: string | undefined) => {
    console.log(`Mock ref called with path: ${path}`, { fullPath: path || 'mock/path.jpg' })
    return { fullPath: path || 'mock/path.jpg' } as StorageReference
  }
).mockName('ref')

export const getStorage = fn()
  .mockName('getStorage')
  .mockReturnValue({} as FirebaseStorage)

export const uploadBytes = fn()
  .mockName('uploadBytes')
  .mockImplementation(
    async (ref: StorageReference, _data: Blob | Uint8Array | ArrayBuffer) => {
      return {
        ref
      } as UploadResult
    }
  )
