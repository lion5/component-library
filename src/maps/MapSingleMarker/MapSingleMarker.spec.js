import MapSingleMarker from '@/base/components/maps/MapSingleMarker/MapSingleMarker.vue'
import MapBase from '@/base/components/maps/MapBase/MapBase.vue'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { LatLng, Marker } from 'leaflet'
import flushPromises from 'flush-promises'

describe('MapSingleMarker', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MapSingleMarker, {
      attachTo: document.body,
      propsData: {
        id: 'test-map',
        marker: undefined,
        zoom: 12,
        center: new LatLng(0, 0)
      }
    })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  describe(':props', () => {
    it(':id - is applied to main div', async () => {
      const expectedId = 'expectedId'
      await wrapper.setProps({id: expectedId})

      expect(wrapper.find(`#${expectedId}`).exists()).toBeTruthy()
    })

    it(':marker - map is initialized when marker is undefined', async () => {
      const mapTilePane = wrapper.find('.map').find('.leaflet-tile-pane')
      expect(mapTilePane.exists()).toBeTruthy()
    })
    it(':marker - displays no marker when marker is undefined', async () => {
      const marker = wrapper.find('.map').find('.leaflet-marker-icon')
      expect(marker.exists()).toBeFalsy()
    })
    it(':marker - displays marker when marker is set', async () => {
      wrapper.destroy()
      wrapper = mount(MapSingleMarker, {
        attachTo: document.body,
        propsData: {
          id: 'test-map',
          marker: new Marker(new LatLng(0, 0)),
          zoom: 12,
          center: new LatLng(0, 0)
        }
      })

      const marker = wrapper.find('.map').find('.leaflet-marker-icon')
      expect(marker.exists()).toBeTruthy()
    })

    it(':marker - displays marker when marker is set after initialized', async () => {
      await wrapper.setProps({
        marker: new Marker(new LatLng(49, 10))
      })
      await flushPromises()
      console.info(wrapper.find('.map').find('.leaflet-pane').html())

      const marker = wrapper.find('.map').find('.leaflet-marker-icon')
      expect(marker.exists()).toBeTruthy()
    })

    it(':zoom - set zoom level when map is created', async () => {
      const expectedZoom = 18
      wrapper.destroy()
      wrapper = mount(MapSingleMarker, {
        attachTo: document.body,
        propsData: {
          id: 'test-map',
          marker: new Marker(new LatLng(0, 0)),
          zoom: expectedZoom,
          center: new LatLng(0, 0)
        }
      })

      expect(wrapper.findComponent(MapBase).vm.zoom).toBe(expectedZoom)
    })
    it(':zoom - set zoom level on existing map', async () => {
      const expectedZoom = 2
      await wrapper.setProps({
        zoom: expectedZoom
      })

      expect(wrapper.findComponent(MapBase).vm.zoom).toBe(expectedZoom)
    })

    it(':center - set center when map is created', async () => {
      const expectedCenter = new LatLng(49, 10)
      wrapper.destroy()
      wrapper = mount(MapSingleMarker, {
        attachTo: document.body,
        propsData: {
          id: 'test-map',
          marker: undefined,
          zoom: 12,
          center: expectedCenter
        }
      })

      expect(wrapper.findComponent(MapBase).vm.center).toBe(expectedCenter)
    })

    it(':center - set center on existing map', async () => {
      const expectedCenter = new LatLng(49, 10)
      await wrapper.setProps({center: expectedCenter})

      expect(wrapper.findComponent(MapBase).vm.center).toBe(expectedCenter)
    })
  })
})
