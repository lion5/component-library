import { onUnmounted, ref } from 'vue'

/**
 * Util function to create and remove an interval
 */
export function useInterval() {
  const interval = ref<number>()

  /**
   * Creates an interval in seconds.
   * Resets previous created intervals.
   *
   * @param callback the function that shall be called after every timeout
   * @param timeoutInSeconds the interval size in seconds
   */
  const createIntervalSeconds = (
    callback: () => void,
    timeoutInSeconds: number
  ) => {
    removeInterval()
    interval.value = setInterval(
      () => {
        callback()
      },
      (timeoutInSeconds || 5) * 1000
    ) as unknown as number
  }

  /**
   * Removes a created interval if exists
   */
  const removeInterval = () => {
    if (interval.value == null) return
    clearInterval(interval.value)
  }

  onUnmounted(() => {
    removeInterval()
  })

  return { createIntervalSeconds, removeInterval }
}
