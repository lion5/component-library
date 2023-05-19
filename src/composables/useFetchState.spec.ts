import { describe, expect, it } from 'vitest'
import { useFetchState } from './useFetchState'

describe('useFetchState.ts', () => {
  it('setIdle - changes busy state to false', () => {
    const { setIdle, busy } = useFetchState()
    busy.value = true

    setIdle()

    expect(busy.value).toBeFalsy()
  })
  it('setBusy - changes busy state to true', () => {
    const { setBusy, busy } = useFetchState()
    busy.value = false

    setBusy()

    expect(busy.value).toBeTruthy()
  })
  it('setError - sets error', () => {
    const { setError, error } = useFetchState()
    const expectedError = new Error('This is a test error')

    setError(expectedError)

    expect(error.value).toBe(expectedError)
  })
  it('clearError - clears error', () => {
    const { clearError, error } = useFetchState()
    error.value = new Error('This is a test error')

    clearError()

    expect(error.value).toBe(undefined)
  })
})
