import { onUnmounted, ref } from 'vue'

export function useInterval() {
  const interval = ref<number>()
  const createIntervalSeconds = (
    handler: () => void,
    delayInSeconds: number
  ) => {
    if (interval.value != null) {
      removeInterval()
    }
    interval.value = setInterval(() => {
      handler()
    }, (delayInSeconds || 5) * 1000) as unknown as number
  }

  const removeInterval = () => {
    if (interval.value == null) return
    clearInterval(interval.value)
  }

  onUnmounted(() => {
    removeInterval()
  })

  return { createIntervalSeconds, removeInterval }
}
