import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import LeafletMap from '@leaflet/components/LeafletMap/LeafletMap.vue'
import { LatLng } from 'leaflet'

describe('LeafletMap', () => {
  let wrapper: ReturnType<typeof mountComponent>

  const mountComponent = (
    initialCenter: LatLng = new LatLng(0.0, 0.0),
    initialZoom?: number,
    maxZoom?: number,
    minZoom?: number
  ) => {
    return mount(LeafletMap, {
      attachTo: document.body,
      props: {
        id: 'test-map',
        initialZoom,
        initialCenter,
        maxZoom,
        minZoom
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
    it(':id - renders with correct id', async () => {
      const expectedId = 'expectedId'
      await wrapper.setProps({ id: expectedId })

      expect(wrapper.isVisible())
      expect(wrapper.element.id).toBe('expectedId')
    })

    it(':zoom - set initialZoom when map is created', async () => {
      wrapper.unmount()
      const expectedZoom = 18
      wrapper = mountComponent(undefined, expectedZoom)
      const map = wrapper.findComponent(LeafletMap)

      expect(map.vm.map?.getZoom()).toBe(expectedZoom)
    })

    it(':center - set initialCenter when map is created', async () => {
      wrapper.unmount()
      const expectedCenter = new LatLng(49, 10)
      wrapper = wrapper = mountComponent(expectedCenter)

      expect(wrapper.vm.map?.getCenter()).toStrictEqual(expectedCenter)
    })

    it(':maxZoom/:minZoom - set maxZoom and minZoom when map is created', async () => {
      wrapper.unmount()
      const expectedMaxZoom = 100
      const expectedMinZoom = 10
      wrapper = mountComponent(undefined, 15, expectedMaxZoom, expectedMinZoom)

      expect(wrapper.vm.map?.getMaxZoom()).toStrictEqual(expectedMaxZoom)
      expect(wrapper.vm.map?.getMinZoom()).toStrictEqual(expectedMinZoom)
    })
  })
})
