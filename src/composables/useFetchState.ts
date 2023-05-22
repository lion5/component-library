import { ref } from 'vue'

/**
 * Provides busy and error state for fetch actions
 */
export function useFetchState() {
  const busy = ref<boolean>(false)
  const error = ref<Error | undefined>()

  /**
   * set the error state
   *
   * @param newError the error that shall be applied
   */
  const setError = (newError: Error | undefined) => {
    error.value = newError
  }

  /**
   * removes any stored error
   */
  const clearError = () => {
    error.value = undefined
  }

  /**
   * sets the busy state to true
   */
  const setBusy = () => {
    busy.value = true
  }

  /**
   * sets the busy state to false
   */
  const setIdle = () => {
    busy.value = false
  }

  return { setIdle, setBusy, setError, clearError, busy, error }
}
