import { describe, expect, it, vi } from 'vitest'
import { useFirebaseStorage } from '@/composables/useFirebaseStorage'
import type {
  FirebaseStorage,
  StorageReference,
  UploadResult
} from 'firebase/storage'
import { getStorage, ref, uploadBytes } from 'firebase/storage'

vi.mock('firebase/storage')

describe('useFirebaseStorage.ts', () => {
  it('uploadFile - calls uploadBytes with given file and path', async () => {
    const expectedFile = new File([], '', { type: 'image/png' })
    const expectedFilePath = 'test-file-path'

    const expectedStorage = 'fake-storage' as unknown as FirebaseStorage
    const expectedRef = 'fake-storage-ref' as unknown as StorageReference
    const expectedReturnPath = 'test-returned-path'

    const mockedGetStorage = vi.mocked(getStorage)
    mockedGetStorage.mockReturnValue(expectedStorage)
    const mockedRef = vi.mocked(ref)
    mockedRef.mockReturnValue(expectedRef)
    const mockedUploadBytes = vi.mocked(uploadBytes)
    mockedUploadBytes.mockResolvedValueOnce({
      ref: { fullPath: expectedReturnPath }
    } as UploadResult)
    const { uploadFile } = useFirebaseStorage()
    await uploadFile(expectedFile, expectedFilePath)

    expect(ref).toHaveBeenCalledWith(expectedStorage, expectedFilePath)
    expect(uploadBytes).toHaveBeenCalledWith(expectedRef, expectedFile, {
      contentType: expectedFile.type
    })
  })
})
