import type { MarkerOptions } from 'leaflet'
import { Marker } from 'leaflet'
import { flushPromises, mount } from '@vue/test-utils'
import GeolocationInput from '@/atoms/inputs/GeolocationInput/GeolocationInput.vue'
import { GpsLocation } from '@/models/gpsLocation'
import LeafletMap from '@/atoms/map/LeafletMap/LeafletMap.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('GeolocationInput', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = () => {
    document.body.innerHTML = `<div id="geolocation-input"></div>`
    return mount(GeolocationInput, {
      attachTo: document.body,
      props: {
        name: 'location',
        modelValue: new GpsLocation(10.0, 10.0),
        markerPopupTitle: 'Title'
      }
    })
  }

  beforeEach(() => {
    wrapper = mountComponent()
  })

  afterEach(() => {
    wrapper.unmount()
  })

  describe(':props', () => {
    it(':id - is applied to LeafletMap', async () => {
      const expectedMapId = 'location-map'

      const leafletMap = wrapper.findComponent(LeafletMap)
      expect(leafletMap.vm.id).toBe(expectedMapId)
    })

    it(':modelValue - location is applied to LeafletMap', async () => {
      const location = new GpsLocation(49, 10)
      const expectedMarker = new Marker(location.toLatLng(), {
        draggable: true
      } as unknown as MarkerOptions)

      await wrapper.setProps({ modelValue: location })
      const marker = wrapper.vm.marker

      expect(marker?.getLatLng()).toStrictEqual(expectedMarker.getLatLng())
      expect(marker?.options.draggable).toEqual(true)
    })
  })

  describe('@events', () => {
    it('@input - triggers when marker moved', async () => {
      const geolocation = new GpsLocation(49.1, 10.1)
      await wrapper.setProps({ modelValue: geolocation })

      const marker = wrapper.vm.marker
      await marker?.fire('dragend')
      await flushPromises()

      expect(wrapper.emitted('update:modelValue')?.at(0)).toStrictEqual([
        geolocation
      ])
    })
  })
})
