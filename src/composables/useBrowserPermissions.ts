import { computed, ref } from 'vue'

export enum PermissionState {
  INITIAL = 'initial',
  PROMPT = 'prompt',
  GRANTED = 'granted',
  DENIED = 'denied'
}

const locationPermissionState = ref<string>(PermissionState.INITIAL)

export function useBrowserPermissions() {
  const queryLocationPermission = async () => {
    try {
      const status = await navigator.permissions.query({
        name: 'geolocation'
      })

      // user might change the permission at any point in time, so we listen to changes
      // NOTE: this doesn't work on iOS / Safari, so we need to manually update
      // the locationPermissionState in the callbacks of the location access methods (e.g. navigator.watchPosition)
      status.onchange = () => {
        locationPermissionState.value = status.state
      }

      return (locationPermissionState.value = status.state)
    } catch (error: Error | unknown) {
      console.error('Could not query geolocation permission', error)
    }
  }

  const locationGranted = computed(
    () => locationPermissionState.value === PermissionState.GRANTED
  )

  const locationDenied = computed(
    () => locationPermissionState.value === PermissionState.DENIED
  )

  const locationModalVisible = computed(
    () =>
      // hide modal until permission state is initialized
      locationPermissionState.value !== PermissionState.INITIAL &&
      locationPermissionState.value !== PermissionState.GRANTED
  )

  return {
    locationPermissionState,
    locationGranted,
    locationDenied,
    locationModalVisible,
    queryLocationPermission
  }
}
