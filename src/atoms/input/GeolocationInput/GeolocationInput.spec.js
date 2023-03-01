import '@/configuration/validation'
import GeolocationInput from '@/base/components/input/GeolocationInput/GeolocationInput.vue'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import MapSingleMarker from '@/base/components/maps/MapSingleMarker/MapSingleMarker.vue'
import { Address } from '@/base/models/address'
import { PiniaVuePlugin } from 'pinia'
import Vue from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { Tenant } from '@/configuration/models/tenant'
import { GeoPosition } from '@/base/models/latlng'
import { Marker } from 'leaflet'
import flushPromises from 'flush-promises'

Vue.use(PiniaVuePlugin)

describe('GeolocationInput', () => {
  let wrapper
  let initialState

  beforeEach(() => {
    initialState = {
      config: {
        tenant: new Tenant()
      }
    }

    wrapper = mount(GeolocationInput, {
      attachTo: document.body,
      propsData: {
        id: 'test-map',
        value: new Address(),
        companyPosition: new GeoPosition()
      },
      pinia: createTestingPinia({initialState})
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe(':props', () => {
    it(':id - is applied to MapSingleMarker', async () => {
      const expectedId = 'expectedId'
      await wrapper.setProps({id: expectedId})

      const mapSingleMarker = wrapper.findComponent(MapSingleMarker)
      expect(mapSingleMarker.vm.id).toBe(expectedId)
    })

    it(':value - is applied to MapSingleMarker', async () => {
      const geolocation = new GeoPosition(49, 10)
      const expectedMarker = new Marker(geolocation.toLatLng(), {
        draggable: true,
        autoPan: true
      })

      await wrapper.setProps({value: geolocation})

      const mapSingleMarker = wrapper.findComponent(MapSingleMarker)
      expect(mapSingleMarker.vm.marker.getLatLng()).toStrictEqual(expectedMarker.getLatLng())
      expect(mapSingleMarker.vm.marker.options.draggable).toStrictEqual(expectedMarker.options.draggable)
      expect(mapSingleMarker.vm.marker.options.autoPan).toStrictEqual(expectedMarker.options.autoPan)
    })
    it(':value - zoom closer to marker when changed', async () => {
      const geolocation = new GeoPosition(49, 10)
      await wrapper.setProps({value: geolocation})

      const mapSingleMarker = wrapper.findComponent(MapSingleMarker)
      expect(mapSingleMarker.vm.zoom).toBe(18)
    })
    it(':value - center to marker when changed', async () => {
      const geolocation = new GeoPosition(49, 10)
      await wrapper.setProps({value: geolocation})

      const mapSingleMarker = wrapper.findComponent(MapSingleMarker)
      expect(mapSingleMarker.vm.center).toStrictEqual(geolocation.toLatLng())
    })
  })

  describe('@events', () => {
    it('@input - triggers when marker moved', async () => {
      const geolocation = new GeoPosition(49.1, 10.1)
      await wrapper.setProps({value: geolocation})

      const marker = wrapper.vm.marker
      await marker.fire('dragend')
      await flushPromises()

      expect(wrapper.emitted('input')[0]).toStrictEqual([geolocation])
    })
  })
})
