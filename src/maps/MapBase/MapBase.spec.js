import MapBase from '@/base/components/maps/MapBase/MapBase.vue'
import { beforeEach, afterEach, describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { LatLng, Marker } from 'leaflet'

describe('MapBase', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(MapBase, {
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

    it(':zoom - set zoom level when map is created', async () => {
      const expectedZoom = 18
      wrapper.destroy()
      wrapper = mount(MapBase, {
        attachTo: document.body,
        propsData: {
          id: 'test-map',
          marker: new Marker(new LatLng(0, 0)),
          zoom: expectedZoom,
          center: new LatLng(0, 0)
        }
      })

      const map = wrapper.find('.map')
      expect(map.vm.map.getZoom()).toBe(expectedZoom)
    })
    it(':zoom - set zoom level on existing map', async () => {
      const expectedZoom = 2
      await wrapper.setProps({
        zoom: expectedZoom
      })

      const map = wrapper.find('.map')
      expect(map.vm.map.getZoom()).toBe(expectedZoom)
    })

    it(':center - set center when map is created', async () => {
      const expectedCenter = new LatLng(49, 10)
      wrapper.destroy()
      wrapper = mount(MapBase, {
        attachTo: document.body,
        propsData: {
          id: 'test-map',
          marker: undefined,
          zoom: 12,
          center: expectedCenter
        }
      })

      const map = wrapper.find('.map')
      expect(map.vm.map.getCenter()).toStrictEqual(expectedCenter)
    })

    it(':center - set center on existing map', async () => {
      const expectedCenter = new LatLng(49, 10)
      await wrapper.setProps({center: expectedCenter})

      const map = wrapper.find('.map')
      expect(map.vm.map.getCenter()).toStrictEqual(expectedCenter)
    })
  })
})
