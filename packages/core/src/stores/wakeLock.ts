import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useWakeLockStore = defineStore('wakeLock', () => {
  const isSupported = 'wakeLock' in navigator && 'request' in navigator.wakeLock

  const toggled = ref<boolean>(false)
  watch(toggled, async (isToggled) => {
    if (isToggled) {
      await _requestWakeLock()
    } else {
      await _releaseWakeLock()
    }
  })

  const _wakeLock = ref<WakeLockSentinel>()

  const _requestWakeLock = async () => {
    try {
      _wakeLock.value = await navigator.wakeLock.request('screen')
      console.log('Wake lock enabled')
    } catch (e) {
      console.warn('Wake lock could not be requested', e)
      toggled.value = false
    }
  }

  const _releaseWakeLock = async () => {
    if (!_wakeLock.value) {
      console.log('No wake lock to release')
      return
    }
    try {
      _wakeLock.value.release()
      _wakeLock.value = undefined
      console.log('Wake lock released')
    } catch (e) {
      console.warn('Wake lock could not be released', e)
    }
  }

  return { toggled, isSupported }
})
