import '@/configuration/validation'
import AddressGeolocationInput from '@/base/components/input/AddressGeolocationInput/AddressGeolocationInput.vue'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import PortalAddressInput from '@/base/components/input/PortalAddressInput.vue'
import GeolocationInput from '@/base/components/input/GeolocationInput/GeolocationInput.vue'
import { Address } from '@/base/models/address'
import { PiniaVuePlugin } from 'pinia'
import Vue from 'vue'
import { createTestingPinia } from '@pinia/testing'
import { City, Tenant } from '@/configuration/models/tenant'
import { GeoPosition } from '@/base/models/latlng'
import axios from 'axios'
import flushPromises from 'flush-promises'
import { useConfigurationStore } from '@/configuration/store/configuration'
import PortalActionButton from '@/base/components/PortalActionButton.vue'

Vue.use(PiniaVuePlugin)

describe('AddressGeolocationInput', () => {
  let wrapper
  let initialState

  beforeEach(() => {
    initialState = {
      config: {
        tenant: new Tenant()
      }
    }

    wrapper = mount(AddressGeolocationInput, {
      attachTo: document.body,
      propsData: {
        id: 'test-map',
        value: new Address(),
        companyGeolocation: new GeoPosition()
      },
      pinia: createTestingPinia({ initialState })
    })
  })

  afterEach(() => {
    wrapper.destroy()
    vi.clearAllMocks()
  })

  describe(':props', () => {
    it(':id - is applied to PortalAddressInput and MapSingleMarker', async () => {
      const expectedId = 'expectedId'
      await wrapper.setProps({ id: expectedId })

      const addressInput = wrapper.findComponent(PortalAddressInput)
      const geolocationInput = wrapper.findComponent(GeolocationInput)

      expect(addressInput.vm.id).toBe(`address-${expectedId}`)
      expect(geolocationInput.vm.id).toBe(`map-${expectedId}`)
    })

    it(':value - is applied to PortalAddressInput', async () => {
      const expectedAddress = new Address('teststreet', 'postalCode', 'city')
      await wrapper.setProps({ value: expectedAddress })

      const addressInput = wrapper.findComponent(PortalAddressInput)
      expect(addressInput.vm.value).toBe(expectedAddress)
    })
    it(':value - reset button is disabled when value (address) is not complete', async () => {
      const partialAddress = new Address('teststreet', 'postalCode', '')
      await wrapper.setProps({ value: partialAddress })

      const resetButton = wrapper.find('button')
      expect(resetButton.attributes('disabled')).toBe('disabled')
    })

    it(':companyGeolocation - is applied to GeolocationInput', async () => {
      const expectedGeolocation = new GeoPosition(49.11, 10.11)
      await wrapper.setProps({ companyGeolocation: expectedGeolocation })

      const addressInput = wrapper.findComponent(GeolocationInput)
      expect(addressInput.vm.value).toBe(expectedGeolocation)
    })
    it(':companyGeolocation - map overlay is displayed when companyGeolocation is empty', async () => {
      await wrapper.setProps({ companyGeolocation: new GeoPosition() })

      expect(wrapper.find('.map-overlay').exists()).toBeTruthy()
    })
    it(':companyGeolocation - map overlay is hidden when companyGeolocation is not empty', async () => {
      await wrapper.setProps({ companyGeolocation: new GeoPosition(49, 10) })

      expect(wrapper.find('.map-overlay').exists()).toBeFalsy()
    })
  })

  describe('@events', () => {
    it('@input (PortalAddressInput) - emit as input', async () => {
      const expectedAddress = new Address('street', 'postalCode', 'city')

      const input = wrapper.findComponent(PortalAddressInput)
      await input.vm.$emit('input', expectedAddress)

      expect(wrapper.emitted('input')[0]).toStrictEqual([expectedAddress])
    })
    it('@input (GeolocationInput) - emit as input-geolocation', async () => {
      const expectedGeolocation = new GeoPosition(1, 1)

      const input = wrapper.findComponent(GeolocationInput)
      await input.vm.$emit('input', expectedGeolocation)

      expect(wrapper.emitted('input-geolocation')[0]).toStrictEqual([expectedGeolocation])
    })

    it('@input-finished - triggers geolocation resolver when geolocation isEmpty', async () => {
      const expectedGeoLocation = new GeoPosition(49.9, 10.1)
      const mockAxiosGet = vi.fn().mockResolvedValue({
        data: [{
          lat: expectedGeoLocation.latitude,
          lon: expectedGeoLocation.longitude
        }]
      })
      vi.spyOn(axios, 'create').mockReturnValue({
        get: mockAxiosGet
      })
      await wrapper.setProps({
        value: new Address('street', 'postalCode', 'city'),
        companyGeolocation: new GeoPosition()
      })

      const input = wrapper.findComponent(PortalAddressInput)
      await input.vm.$emit('input-finished')
      await flushPromises()

      expect(mockAxiosGet).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/?q=street%2C+postalCode+city&format=json&addressdetails=1&countryCodes=de')
      expect(wrapper.emitted('input-geolocation')[0]).toStrictEqual([expectedGeoLocation])
    })
    it('@input-finished - use default position when osm request fails and geolocation isEmpty', async () => {
      vi.spyOn(axios, 'create').mockReturnValue({
        get: vi.fn().mockRejectedValue({})
      })
      await wrapper.setProps({
        value: new Address('street', 'postalCode', 'city'),
        companyGeolocation: new GeoPosition()
      })
      const expectedGeoPosition = new GeoPosition(49.9, 10.1)
      const configStore = useConfigurationStore()
      configStore.tenant = new Tenant(new City(expectedGeoPosition))

      const input = wrapper.findComponent(PortalAddressInput)
      await input.vm.$emit('input-finished')
      await flushPromises(wrapper.emitted('input-geolocation'))

      expect(wrapper.emitted('input-geolocation')[0]).toStrictEqual([expectedGeoPosition])
    })
    it('@input-finished - triggers not geolocation resolver when geolocation not isEmpty', async () => {
      vi.spyOn(axios, 'create')
      await wrapper.setProps({
        value: new Address('street', 'postalCode', 'city'),
        companyGeolocation: new GeoPosition(49, 10)
      })

      const input = wrapper.findComponent(PortalAddressInput)
      await input.vm.$emit('input-finished')
      await flushPromises()

      expect(wrapper.emitted('input-geolocation')).toBe(undefined)
    })

    it('@click - click on button triggers geolocation resolver', async () => {
      const expectedGeoLocation = new GeoPosition(49.91, 10.19)
      const mockAxiosGet = vi.fn().mockResolvedValue({
        data: [{
          lat: expectedGeoLocation.latitude,
          lon: expectedGeoLocation.longitude
        }]
      })
      vi.spyOn(axios, 'create').mockReturnValue({
        get: mockAxiosGet
      })
      await wrapper.setProps({
        value: new Address('street', 'postalCode', 'city'),
        companyGeolocation: new GeoPosition()
      })

      const input = wrapper.findComponent(PortalActionButton)
      await input.vm.$emit('click')
      await flushPromises()

      expect(mockAxiosGet).toHaveBeenCalledWith('https://nominatim.openstreetmap.org/?q=street%2C+postalCode+city&format=json&addressdetails=1&countryCodes=de')
      expect(wrapper.emitted('input-geolocation')[0]).toStrictEqual([expectedGeoLocation])
    })
  })
})
