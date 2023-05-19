import { ref } from 'vue'

export function useFetchState() {
  const busy = ref<boolean>(false)
  const error = ref<Error | undefined>()
  const setError = (newError: Error | undefined) => {
    error.value = newError
  }
  const clearError = () => {
    error.value = undefined
  }

  const setBusy = () => {
    busy.value = true
  }
  const setIdle = () => {
    busy.value = false
  }

  return { setIdle, setBusy, setError, clearError, busy, error }
}
