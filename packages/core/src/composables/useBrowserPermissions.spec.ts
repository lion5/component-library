import { afterEach, describe, expect, it, vi } from 'vitest'
import { useBrowserPermissions } from './useBrowserPermissions'

type GeolocationPermissionState = 'granted' | 'prompt' | 'denied'

describe('useBrowserPermissions', () => {
  describe('geolocation', () => {
    const mockQueryGeolocationPermission = (state: GeolocationPermissionState) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      navigator.permissions = {
        query: vi.fn().mockResolvedValue({ state: state, onchange: vi.fn() })
      }
    }

    afterEach(() => {
      vi.clearAllMocks()
    })

    describe('queryLocationPermission', () => {
      it('should update locationPermissionState and return correct value', async () => {
        const { queryLocationPermission, locationPermissionState } = useBrowserPermissions()
        const stateValues: GeolocationPermissionState[] = ['granted', 'denied', 'prompt']

        for (const stateValue of stateValues) {
          mockQueryGeolocationPermission(stateValue)

          const resultState = await queryLocationPermission()

          expect(resultState).toBe(stateValue)
          expect(locationPermissionState.value).toBe(stateValue)
          expect(navigator.permissions.query).toHaveBeenCalledOnce()

          vi.clearAllMocks()
        }
      })
    })

    describe('locationGranted', () => {
      it('should only be true if permission granted', async () => {
        const { queryLocationPermission, locationGranted } = useBrowserPermissions()
        const stateValues: GeolocationPermissionState[] = ['granted', 'denied', 'prompt']

        for (const stateValue of stateValues) {
          mockQueryGeolocationPermission(stateValue)

          await queryLocationPermission()

          expect(locationGranted.value).toBe(stateValue === 'granted')
          expect(navigator.permissions.query).toHaveBeenCalledOnce()

          vi.clearAllMocks()
        }
      })
    })

    describe('locationDenied', () => {
      it('should only be true if permission denied', async () => {
        const { queryLocationPermission, locationDenied } = useBrowserPermissions()
        const stateValues: GeolocationPermissionState[] = ['granted', 'denied', 'prompt']

        for (const stateValue of stateValues) {
          mockQueryGeolocationPermission(stateValue)

          await queryLocationPermission()

          expect(locationDenied.value).toBe(stateValue === 'denied')
          expect(navigator.permissions.query).toHaveBeenCalledOnce()

          vi.clearAllMocks()
        }
      })
    })
  })
})
